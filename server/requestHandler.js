var crawler = require('./crawler');

var crawle = function (pathName, req, res) {
    res.writeHead(200, {'Content-type': 'application/json'});
    crawler[pathName](req, res);
    return '200';
};

exports.crawle = crawle;