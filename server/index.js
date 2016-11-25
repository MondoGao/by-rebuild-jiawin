var server = require('./server');
var route = require('./router').route;
var requestHandler = require('./requestHandler');

var handler = {
    '/page': function(req, res) {
        requestHandler.crawle('page', req, res);
    },
    '/gallery': function(req, res) {
        requestHandler.crawle('gallery', req, res);
    },
    '/slider':function(req, res) {
        requestHandler.crawle('slider', req, res);
    },
    '/notice': function(req, res) {
        requestHandler.crawle('notice', req, res);
    },
};

exports.start = function () {
    server.start(route, handler);
};
