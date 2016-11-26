var template = require('./template');

(function () {

    var funRender = function (e) {
        console.log(e);
        var self = e.currentTarget;
        var wrap = document.createElement('div');
        wrap.innerHTML = template(self.tplName, {
            data: self.response
        });
        while (wrap.firstElementChild) {
            document.querySelector(self.queryEle).appendChild(wrap.firstElementChild);
        }
        if (self.callBack && self.callBack()) ;// 空语句
    }

    var funGetCrawler = function (queryEle, tplName, url, callBack) {
        var req = new XMLHttpRequest();
        req.addEventListener('load', funRender);
        req.responseType = 'json';
        req.queryEle = queryEle;
        req.tplName = tplName;
        req.callBack = callBack;
        req.open('get', url, true);
        req.send();
    };
    funGetCrawler("#notice ul",'notice-item', '/notice');
    funGetCrawler("#artical ul",'artical-item', '/page?page=1');
    funGetCrawler("#gallery-wrap",'gallery-item', '/gallery');
    funGetCrawler("#aim-slide",'slider-item', '/slider');
})();

