export default class Node {
    static require(path):Function {
        return require(path);
    }
    static get Http():any{
        return this.require('http');
    }
    static get Https():any{
        return this.require('https');
    }
    static get Fs():any{
        return this.require('fs');
    }
    static get Path():any{
        return this.require('path');
    }
    static get Url():any{
        return this.require('url');
    }
    static get Qs():any{
        return this.require('querystring');
    }
    static get Zlib():any{
        return this.require('zlib');
    }
}