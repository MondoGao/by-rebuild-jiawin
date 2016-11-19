

console.log(require('./test.js'));

var html = require('../app/tmpl/helloworld.tmpl');
document.querySelector('header').innerHTML = html({data:"hello world"});
