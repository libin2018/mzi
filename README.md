
# 妹子图模拟人工下载工具(node.js + puppeteer + 截图)
[![AUR](https://img.shields.io/badge/GPL-v3-red)](https://github.com/libin2018/mzi/blob/master/License)
[![](http://copy.wudikeji.cn/fonts/Author-libin-orange.svg)](http://blog.wudikeji.cn)
[![](https://img.shields.io/badge/version-1.0-brightgreen.svg)](https://github.com/libin2018/mzi)
[![GitHub stars](https://img.shields.io/github/stars/libin2018/mzi.svg?style=social&label=Stars)](https://github.com/libin2018/mzi)
[![GitHub forks](https://img.shields.io/github/forks/libin2018/mzi.svg?style=social&label=Fork)](https://github.com/libin2018/mzi)
> 当前开源版本v1.0 [点我获取最新源码及文档v1.1](http://pay.wudikeji.cn/Home/Pay?productId=mzi)

### 项目运行效果
- 运行界面

    ![](http://pay.wudikeji.cn/images/mzi/test.png)

- 运行结果

	![](http://pay.wudikeji.cn/images/mzi/test2.png)

#### 注：v1.1源码（含详细文档 & 测试图片（百度云））获取方式 
- 进入 [个人收款支付官网](http://pay.wudikeji.cn/Home/Pay?productId=mzi) 成功支付测试后 将自动发至你所填写的邮箱中

### 声明
> 此系统只针对个人练习使用，当然你还可将此项目当作入门级的node.js + puppeteer练习项目

### 后端所用技术
- [node.js](https://nodejs.org/zh-cn/)
- [puppeteer](https://github.com/puppeteer/puppeteer)
- [commander](https://www.npmjs.com/package/commander)

### 本地开发运行部署
- 需安装node.js
- 运行命令

npm i  --registry=https://registry.npm.taobao.org

cnpm i
// 会下载Chrome100M左右

npm start 
// or
node index.js -l 1,5
// -L(需小写l) 1,5表示从1页到5页的图片下载

### 待解决的问题
- 妹子图网站有反爬虫机制
- 1.速度太快，为了防止被503，修改为await同步执行了，这样速度不快，爬一个套图需要1min，243 * 24 = 5832min = 4天
- 2.某一个IP频繁访问会被封（简单的办法，重启路由器），终极方案是购买一个IP代理

### 作者其他项目推荐
#### 已完成
- [个人收款支付系统](https://github.com/libin2018/pay)
- [精品网站模板商城（前端）](https://github.com/libin2018/jq)
- [匿名文件共享在线工具](https://github.com/libin2018/copy)
- [PDF转Word在线工具](https://github.com/libin2018/pdf)
- [妹子图模拟人工下载工具](https://github.com/libin2018/mzi)
- [Saas客户关系管理系统](https://github.com/libin2018/crm)

- [精品网站模板商城（后端）](https://github.com/libin2018/jqadmin)
- [公章抠图在线工具](https://github.com/libin2018/seal)
- [收款消息客户端(Android)](https://github.com/libin2018/payhelp)
- [帮助中心系统（MarkDown）](https://github.com/libin2018/md)
- [游戏辅助工具（Arduino模拟鼠键）](https://github.com/libin2018/ino)

### 技术疑问交流
- QQ交流群 `604713815`，可获取各项目详细图文文档、疑问解答 [![](http://pub.idqqimg.com/wpa/images/group.png)](https://jq.qq.com/?_wv=1027&k=56tDAhJ)

- 作者博客：[http://blog.wudikeji.cn](http://blog.wudikeji.cn)
### [捐赠](http://pay.wudikeji.cn/Home/Pay?productId=mzi)
"# mzi" 
