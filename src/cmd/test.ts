import {Command} from './command';
import {Option} from './command';
import {Cli} from "./command";

import {Client as Github} from 'github/client';

@Command({
    title  : 'Temporary Test',
    usage  : [`
    Usage :
    |  espm test suite method [args...]
    `]
})
export class Test extends Cli {
    private get github():Github{
        return new Github();
    };
    execute(...args){
        if(args.length<2){
          Test.help();
        } else {
            var s=args.shift(),m=args.shift();
            var suite = this[s];
            if (suite) {
                var method = suite[m];
                if (typeof method == 'function') {
                    suite[m](...args)
                } else {
                    console.error(`no such method "${m}" in suite "${s}"`)
                }
            } else {
                console.error(`no such suite "${s}"`);
            }
        }
    }
}


