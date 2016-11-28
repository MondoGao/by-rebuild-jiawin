var libUrl = require('url');
var libQuerystring = require('querystring');

var libSuperagent = require("superagent");
var libCheerio = require("cheerio");

var _getPage = function(req, res, pageUrl, queryEle, titleEle) { // 请求，回应，要抓取的网页链接，在网页内遍历的元素选择器，抓取title的元素选择器
    libSuperagent.get(pageUrl)
        .end(function (err, content) {
            var $ = libCheerio.load(content.text);
            var data = []; // 保存抓取结果

            $(queryEle).each(function (index, artical) {
                let titleEl = $(this).find(titleEle);
                data[index] = {
                    title: titleEl.attr('alt') || titleEl.attr('title'),
                    src: titleEl.attr('src'),
                    href: titleEl.attr('href'),
                    time: $(this).find('time.time').text().replace(/\s+/g,"") || $(this).find('span').text(),
                    heartNum: $(this).find('.heart-num').text(),
                    commentNum: $(this).find('.comment-num a').text(),
                    viewNum: $(this).find('.view-num').text() || $(this).find('.extra > span').text(),
                    category: $(this).find('[rel="category tag"]').text(),
                };
                for (let i in data[index]) {
                    if(data[index][i] === "") {
                        delete data[index][i]; // 删除无用元素
                    }
                }
            });
            res.write(JSON.stringify({"data": data}));
            res.end();
        });
}

var page = function (req, res) {
    var pageNum = libQuerystring.parse(libUrl.parse(req.url).query).page;
    var pageUrl = 'http://www.jiawin.com/page/' + pageNum;
    _getPage(req, res, pageUrl, '#cool ul li', 'img');
};

var gallery = function (req, res) {
    _getPage(req, res, 'http://www.jiawin.com/', '#love .group', 'img');
};

var slider = function (req, res) {
    _getPage(req, res, 'http://www.jiawin.com/', '.swiper-slide[id^=post]', 'img');
};

var notice = function (req, res) {
    _getPage(req, res, 'http://www.jiawin.com/', '#notice ul li', 'a');
};

exports.page = page;
exports.gallery = gallery;
exports.slider = slider;
exports.notice = notice;