# 简介

主要功能：投票服务端。[参考地址](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)

主要技术：
一、利用了mocha+chai测试框架;
二、不可变数据结构库imutable.js;
三、使用Nodejs模块socket.io实现客户端和服务端的WebSocket连接;
四、利用redux保存整个应用的状态。

整体流程：
一、客户端向服务器发送指定的action
二、服务器将操作权交给Redux Store
三、Redux Store调用reducer[通过dispatch]并且reducer执行与action相关的逻辑。
四、Redux Store更新状态，基于reducer返回的值
五、Redux Store执行被服务器subscribe订阅的监听函数
六、服务器发出'state'事件
七、所有连接的客户端（包括启动原始操作的客户端）接收Redux Store最新的状态
