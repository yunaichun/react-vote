#简介postcss-loader

主要功能：投票客户端。[参考地址](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)，[官方文档-React地址](https://reactjs.org/docs/hello-world.html)，[官方文档-ReactRouter地址](https://reacttraining.com/react-router/web/guides/philosophy)，[官方文档-ReactRedux地址](http://redux.js.org/)。


主要技术：</br>
一、利用了mocha+chai测试框架;</br>
二、不可变数据结构库imutable.js;</br></br>
三、使用Nodejs模块socket.io-client实现客户端到服务端的通信。</br>
1、服务端触发客户端'state'事件：服务端'connection'事件监听到有新的客户端连接，结果是发送Redux Store的JSON序列化状态给所有连接的Socket.io客户端【 socket.emit('state', store.getState().toJS()) 】。</br>
客户端监听'state'事件：结果是触发客户端指定actionCreator，去改变客户端Redux Store的状态【 store.dispatch(setState(state)) 】。</br>
2、客户端触发服务端的'action'事件：需要利用redux的applyMiddleware配置中间件发送到socket的连接，结果是可以将特定的action发送到服务端【 socket.emit('action', action) 】。</br>
服务端监听'action'事件：在客户端连接状态下，结果是根据客户端返回的action，去改变服务端Redux Store的状态【 socket.on('action', store.dispatch.bind(store)) 】。</br></br>
四、引入React-Redex：从Redux Store中获取数据渲染到React组件中。</br>
1、createStore初始化不可变应用状态Redux Store；</br>
2、Provider将Redux Store与Component连接；</br>
3、connect将Redux Store状态与Component的Props属性值关联；</br>
4、添加actionCreators，子组件可以接收传递的函数；actionCreators指定type，去调用reducer函数，相当于store.dispatch(actionCreators[xxx](state))。</br>
5、通过dispatch改变Redux Store状态；将不可变数据作为输入，完成无状态组件的渲染。</br></br>
五、webpack配置Eslint in Sublime：</br>
1、安装全局eslint：cnpm install -g eslint</br>
2、项目安装npm插件：yarn add eslint-config-rallycoding  --dev</br>
3、sublime安装插件：SublimeLinter+SublimeLinter-contrib-eslint</br>
4、项目新建.eslintrc配置文件：{"extends": "rallycoding"}</br></br>
六、webpack配置CSS预加载、模块化等技术实现【just test】</br>
1、style-loader</br>
2、css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5</br>
3、less-loader</br>
4、sass-loader</br>
5、postcss-loader+autoprefixer</br>


整体流程：</br>
1、The user clicks a vote button. A VOTE action is dispatched.【用户点击投票按钮，触发客户端 'VOTE' action】</br>
2、The remote action middleware sends the action over the Socket.io connection.【redux的applyMiddleware配置的socket中间件将'VOTE' action发送到服务器】</br>
3、The client-side Redux store handles the action, causing the local hasVote state to be set.【客户端处理此'VOTE' action就会将客户端Redux store投票条目标记'hasVoted'】</br>
4、When the message arrives on the server, the serverside Redux store handles the action, updating the vote in the tally.</br>【服务端处理此'VOTE' action会修改服务端Redux store条目的票数】</br>
5、The listener on the serverside Redux store broadcasts a state snapshot to all connected clients.【由于服务端subscribe了服务端的Redux Store，一旦Store状态发生改变，就会触发客户端的'state'事件。】
整体流程：】</br>
6、A SET_STATE action is dispatched to the Redux store of every connected client.【客户端的监听的'state'事件回调是触发客户端Redux Store的SET_STATE事件】</br>
7、The Redux store of every connected client handles the SET_STATE action with the updated state from the server.【客户端Redux Store的SET_STATE事件结果是合并服务端Redux Store状态到客户端Redux Store】
</br></br>
综上可知：</br>
服务端Redux Store存储投票条目+条票数</br>
客户端Redux Store存储投票条目(刷新就没有了)+接受服务端Redux Store的投票条目、条票数</br>