# node-blog
## 说明
1.该项目是个人博客的后台系统，后台系统使用的是typescript和react技术栈，组件库使用的是ant-design。项目将后台系统和博客API接口放在了一起。其中server目录下是服务端API目录，view目录下是博客后台管理系统。

2.编辑器的选择。目前，发布文章使用的是quill富文本编辑器(感觉不是很好用)，以后会将Markdown编辑器也加入使用。

3.技术栈
* 前端 react+react-router+typescript
* 后端 koa2+mongoose

4.博客后台系统主要提供以下功能：
* 查看管理员列表
* 查看用户列表
* 发布文章(需要超级管理员，使用的是quill富文本编辑器)
* 查看文章列表(支持修改和删除)

5.node-blog接口文档：[API文档](https://github.com/cixiu/node-blog/blob/master/API.md)

## 线上地址
> 博客前端地址：[www.tzpcc.cn](https://www.tzpcc.cn)
> 博客后台管理系统地址：[manage.tzpcc.cn](https://manage.tzpcc.cn)

## 项目运行
> 注意: 服务端使用的是koa2，需要node>=7.6
> 项目使用了mongodb作为数据库，开始运行项目时，请确保开启了数据库
```
git clone https://github.com/cixiu/node-blog.git

cd node-blog

npm install

npm run dev

npm run server:dev
```
