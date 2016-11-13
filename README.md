## Task0

重构觉唯设计官网，静态数据可以用爬虫实现

## 更新记录

### 0.0.1 - 2016-11-02
#### Added
- 初始化仓库
- 位于分支 mondo/task0 下

## 学习纪录
### 准备
- 尝试使用 node 完成爬虫

### 完成
- 使用 http-proxy-middleware 和 browser-sync 配合代理
	- **不知原因，使用 proxy-middleware 进行代理出现异常表现如下**
		- 配置 /list 代理至 http://report.hustonline.net ，访问 localhost/list 跳转到 localhost/pc/index.html （使用 http-proxy-middleware 可以成功代理）
	- 切记更新完 gulpfile.html 后清空浏览器缓存，否则代理可能出现异常
- 使用browser-sync和gulp配合开发
	- 该插件init方法传入配置中，server和proxy不能同时使用，未找到通过proxy代理的方法，转而使用middleware进行代理
	- 将reload当做回调传入gulp.watch可自动inject或reload页面
- 学习并使用gulp进行项目构建
- 尝试使用webpack进行静态资源构建
	- 基本使用方法
	- loader（style-loader完成将css嵌入html）
	- HtmlWebpackPlugin生成html文件
	- ExtractTextPlugin将sass或css从js中移除并打包成单独文件（ExtractTextPlugin.extract(*此处参数为loader数组，不需style-loader*)）

### 放弃
- 尝试使用grunt进行项目构建
