# Task0

重构觉唯设计官网，静态数据可以用爬虫实现

## 项目须知
### 开发环境
#### 安装/配置开发环境
```
npm install
```
#### 运行
```
npm start
```

### 依赖库
- font-awesome

## 更新记录
### 0.3.0 - 2016-11-27
#### Added
- 增加电脑端全尺寸响应
- 增加 CSS 动效

#### Changed
- 完善模版，利用更多数据

### 0.2.0 - 2015-11-25
#### Added
- 增加对觉唯官网的爬虫服务器，可动态获取数据，默认端口2999，已配置代理
- 增加 ajax 动态从爬虫服务器获取数据并用 tmodjs 渲染

#### Fixed
- 修复部分标题溢出

### 0.1.0 - 2016-11-25
#### Added
- 增加 500px - 768px 的响应

### 0.0.2 - 2016-11-21
#### Added
- 增加项目开发环境架构
- 增加电脑端小屏下（width < 500px）的样式和页面架构

### 0.0.1 - 2016-11-02
#### Added
- 初始化仓库
- 位于分支 mondo/task0 下

## 学习纪录
### 准备

### 完成
- 学习 node 搭建服务器和爬虫
- 学习 artTemplate，使用 tmodjs+gulp+webpack 进行打包
- 使用 http-proxy-middleware 和 browser-sync 配合代理
	- **不知原因，使用 proxy-middleware 进行代理出现异常表现如下**
		- 配置 /list 代理至 http://report.hustonline.net，访问 localhost/list 跳转到 localhost/pc/index.html（使用 http-proxy-middleware 可以成功代理）
		- 原因可能是该插件针对 connect 而非 browsersync
	- 切记更新完 gulpfile.html 后清空浏览器缓存，否则代理可能出现异常
- 使用 browser-sync 和 gulp 配合开发
	- 该插件 init 方法传入配置中，server 和 proxy 不能同时使用，未找到通过 proxy 代理的方法，转而使用 middleware 进行代理
	- 将 reload 当做回调传入 gulp.watch 可自动 inject 或 reload 页面
- 学习并使用 gulp 进行项目构建
- 尝试使用 webpack 进行静态资源构建
	- 基本使用方法
	- loader（style-loader 完成将 css 嵌入 html ）
	- HtmlWebpackPlugin 生成html文件
	- ExtractTextPlugin 将 sass 或 css 从 js 中移除并打包成单独文件（ExtractTextPlugin.extract（*此处参数为loader数组，不需style-loader*））

### 放弃
- 尝试使用 grunt 进行项目构建
