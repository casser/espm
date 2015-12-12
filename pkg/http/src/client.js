System.register(['./hello'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var hello_1;
    var Client;
    return {
        setters:[
            function (hello_1_1) {
                hello_1 = hello_1_1;
            }],
        execute: function() {
            /**
             * Created by Sergey on 12/3/15.
             */
            Client = (function () {
                function Client() {
                    console.info('Hello Jan AAA');
                }
                Client = __decorate([
                    hello_1.Hello
                ], Client);
                return Client;
            })();
            exports_1("Client", Client);
        }
    }
});
