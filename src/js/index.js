var template = require('./template.js');

document.querySelector('header').innerHTML = template('helloworld', {data:"hello world"});
