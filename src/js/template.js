/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = this.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('artical-item',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function(value,$index){
$out+=' <li> <figure> <a href="#"> <div class="img-wrap"><img src="';
$out+=$escape(value.src);
$out+='" alt="';
$out+=$escape(value.title);
$out+='"></div> <figcaption> ';
$out+=$escape(value.title);
$out+=' </figcaption> <div class="extra"> <i class="fa fa-bookmark"></i> <a href="#">';
$out+=$escape(value.category);
$out+='</a> <span>';
$out+=$escape(value.viewNum);
$out+=' <i class="fa fa-fire"></i> </span> </div> </a> </figure> <p> <time class="time">';
$out+=$escape(value.time);
$out+='</time> <span><i class="fa fa-comment"></i>';
$out+=$escape(value.commentNum);
$out+='</span> <span><i class="fa fa-heart"></i>';
$out+=$escape(value.viewNum);
$out+='</span> </p> </li> ';
});
return new String($out);
});/*v:1*/
template('gallery-item',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function(value,$index){
$out+=' <li> <figure> <img src="';
$out+=$escape(value.src);
$out+='" alt="';
$out+=$escape(value.title);
$out+='"> <figcaption><i class="fa fa-link"></i></figcaption> </figure> <div class="extra"> <h4> <a href="#">';
$out+=$escape(value.title);
$out+='</a> </h4> <p class="meta"> <time class="time">';
$out+=$escape(value.time);
$out+='</time> <span class="comment-num"><i class="fa fa-comment-o"></i>';
$out+=$escape(value.commentNum);
$out+='</span> <span class="view-num"><i class="fa fa-eye"></i>';
$out+=$escape(value.viewNum);
$out+='</span> <span class="heart-num"><i class="fa fa-heart-o"></i>';
$out+=$escape(value.heartNum);
$out+='</span> </p> </div> </li> ';
});
$out+=' ';
return new String($out);
});/*v:1*/
template('notice-item',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function(value,$index){
$out+=' <li><span>';
$out+=$escape(value.time);
$out+='</span>';
$out+=$escape(value.title);
$out+='</li> ';
});
$out+=' ';
return new String($out);
});/*v:1*/
template('slider-item',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function(value,$index){
$out+=' <li><a href="#"><img src="';
$out+=$escape(value.src);
$out+='" alt="';
$out+=$escape(value.title);
$out+='"></a></li> ';
});
return new String($out);
});

}()