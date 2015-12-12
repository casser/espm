System.register(['./server', './client'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (server_1_1) {
                exportStar_1(server_1_1);
            },
            function (client_1_1) {
                exportStar_1(client_1_1);
            }],
        execute: function() {
        }
    }
});
