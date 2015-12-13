namespace Ecmal {
    export interface Module {
        id?:string;
        url?:string;
        parent?:string|Module;
        dependencies?:(string|Module)[]
        source?:string
        executable?:Function;
        defined?:Boolean;
        exports?:any;
    }
    export interface Modules {
        [key:string]:Module
    }
}
