namespace Ecmal {
    export abstract class Loader {
        public main:string;
        public runtime:string;
        public current:Module;
        public modules:Modules;

        constructor(){
            this.modules = {};
        }
        get base(){
            return this.runtime.replace(/^(.*)\/.*\.js$/g,'$1');
        }

        abstract fetch(url):Promise<string>;
        abstract evaluate(url):Promise<string>;

        get(url){
            var id = url.replace(this.base+'/','').replace(/^(.*)\.js$/g,'$1').toLowerCase();
            var module:Module =this.modules[id];
            if(!module){
                module = this.modules[id] = {id,url};
            }
            return module;
        }
        register(dependencies,executable){
            this.current.dependencies = dependencies;
            this.current.executable = executable;
        }

        import(name){
            var url = Path.resolve(this.base,name+'.js');
            var dir = Path.dirname(url);
            var mod = this.get(url);
            return this.fetch(mod).then((m:Module)=>this.define(m)).then((m:Module)=>m.exports);
        }
        define(module:Module){
            if(module.defined){
                return Promise.resolve(module);
            }else{
                module.defined = true;
                module.exports = {};
                var definer = module.executable((name,val)=>{
                    module.exports[name] = val;
                });
                if(module.dependencies.length){
                    return Promise.all(module.dependencies.map(m=>this.define(m).then(m=>m.exports))).then((exps:any)=>{
                        for(var i=0;i<exps.length;i++){
                            definer.setters[i](exps[i])
                        }
                        definer.execute();
                        return module;
                    })
                }else{
                    definer.execute();
                    return Promise.resolve(module)
                }
            }
        }
    }
    export class ServerSideLoader extends Loader {
        get runtime():string {
            return __filename;
        }
        get main():string {
            return process.argv[2];
        }
        fetch(url):Promise<string> {
            return new Promise((accept,reject)=>{
                reject('implement me');
            })
        }
        evaluate(content):Promise<string> {
            return new Promise((accept,reject)=>{
                reject('implement me');
            })
        }
    }
    export class ClientSideLoader extends Loader {
        get script():HTMLScriptElement{
            return <HTMLScriptElement>document.querySelector('script[main]');
        }
        get runtime():string{
            return this.script.src;
        }
        get main():string{
            return this.script.getAttribute('main');
        }
        fetch(module:Module):Promise<string> {
            var promise = Promise.resolve(module);
            if(typeof module.source=='undefined'){
                module.source = '';
                promise = new Promise((accept, reject)=> {
                    var oReq = new XMLHttpRequest();
                    oReq.addEventListener('load', (e:Event)=>{
                        module.source = oReq.responseText;
                        accept(module);
                    });
                    oReq.addEventListener("error", e=>{
                        reject(e)
                    });
                    oReq.open("get", module.url, true);
                    oReq.send();
                }).then(m=>this.evaluate(m));
            }
            return promise;
        }
        evaluate(module:Module):Promise<string> {
            this.current = module;
            var dir = Path.dirname(module.url);
            var aScript = document.createElement('script');
            aScript.type = 'text/javascript';
            aScript.id = module.id;
            aScript.text = module.source+'\n//# sourceURL='+module.url;
            this.script.parentElement.appendChild(aScript);
            this.current = null;
            var dependencies = module.dependencies.map(d=>{
                return this.fetch(this.get(Path.resolve(dir,d+'.js')));
            });
            return Promise.all(dependencies).then((modules:Module[])=>{
                for(var d=0;d<modules.length;d++){
                    module.dependencies[d] = modules[d];
                    modules[d].parent = module;
                }
                return module;
            });
        }
    }
}