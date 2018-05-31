# 简介
使用Nodejs模块socket.io实现客户端和服务端的WebSocket连接。利用redux保存整个应用的状态。将用户投票结果实时发送给其他所有连接用户。

[参考地址](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)，[官方文档-React](https://reactjs.org/docs/hello-world.html)，[官方文档-React-Router](https://reacttraining.com/react-router/web/guides/philosophy)，[官方文档-Redux](http://redux.js.org/)

## 后端
- 后端: Nodejs + socket.io
- 数据状态: Redux + immutable.js
- 测试框架: Mocha+Chai

## 前端
- 前端: react + redux + react-router
- 自动化: webpack
- 代码审查: esLint(ES6)
- 测试框架: Mocha+Chai

## 启动项目
- install dependencies
```sh
$ cd server
$ npm install
$ cd client
$ npm install
```

- start server 
```sh
$ cd server
$ npm run server
```

- start client 
```sh
$ cd client
$ npm run dev
```

- test server
```sh
$ cd server
$ npm run test
```

- test client
```sh
$ cd client
$ npm run test
```
