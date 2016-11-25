var libHttp = require('http');
var libUrl = require('url');

var handler = require('./requestHandler');

var start = function (route, handler) {
    var onRequest = function (req, res) {
        var reqUrl = libUrl.parse(req.url);
        var pathName = reqUrl.pathname;
        route(req, res, pathName, handler);
    };
    libHttp.createServer(onRequest).listen(2999);
    console.log("Servering...");
};

exports.start = start;