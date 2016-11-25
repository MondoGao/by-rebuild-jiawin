var route = function (request, response, pathName, handler) {
    console.log("Route a request for " + pathName);

    if(typeof(handler[pathName]) === 'function'){
        handler[pathName](request, response);
    } else {
        console.log('No handler found');
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found');
        response.end();
        return '404';
    }
};

exports.route = route;