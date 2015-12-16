import {Client as HttpClient} from 'http/client';

export class Client extends HttpClient {
    constructor(){
        super('https://api.github.com',{
            'User-Agent':'Awesome-Octocat-App'
        });
    }
    show(repo){
        this.request({
            path : `repos/${repo}`
        }).then(r=>{
            var body = JSON.parse(r.content.toString());
            console.info(body);
        }).catch(e=>console.error(e.stack))
    }
}