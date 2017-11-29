# 服务端简介
### 主要功能：
投票服务端。(参考地址)[http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html]，(官方文档-React地址)[https://reactjs.org/docs/hello-world.html]，(官方文档-ReactRouter地址)[https://reacttraining.com/react-router/web/guides/philosophy]，(官方文档-ReactRedux地址)[https://redux.js.org/]。
### 主要技术：
###### 一、利用了mocha+chai测试框架;
###### 二、不可变数据结构库imutable.js;
###### 三、使用Nodejs模块socket.io实现客户端和服务端的WebSocket连接;
###### 四、利用redux保存整个应用的状态。
### 整体流程：
###### 一、客户端向服务器发送指定的action
###### 二、服务器将操作权交给Redux Store
###### 三、Redux Store调用reducer[通过dispatch]并且reducer执行与action相关的逻辑
###### 四、Redux Store更新状态，基于reducer返回的值
###### 五、Redux Store执行被服务器subscribe订阅的监听函数
###### 六、服务器发出'state'事件
###### 七、所有连接的客户端（包括启动原始操作的客户端）接收Redux Store最新的状态

# 客户端简介
### 主要功能：
投票客户端。
### 主要技术：
###### 一、利用了mocha+chai测试框架;
###### 二、不可变数据结构库imutable.js;
###### 三、使用Nodejs模块socket.io-client实现客户端到服务端的通信。
- 服务端触发客户端'state'事件：服务端'connection'事件监听到有新的客户端连接，结果是发送Redux Store的JSON序列化状态给所有连接的Socket.io客户端【 socket.emit('state', store.getState().toJS()) 】。</br>客户端监听'state'事件：结果是触发客户端指定actionCreator，去改变客户端Redux Store的状态【 store.dispatch(setState(state)) 】。
- 客户端触发服务端的'action'事件：需要利用redux的applyMiddleware配置中间件发送到socket的连接，结果是可以将特定的action发送到服务端【 socket.emit('action', action) 】。</br>服务端监听'action'事件：在客户端连接状态下，结果是根据客户端返回的action，去改变服务端Redux Store的状态【 socket.on('action', store.dispatch.bind(store)) 】。

###### 四、引入React-Redex：从Redux Store中获取数据渲染到React组件中。
- createStore初始化不可变应用状态Redux Store；
- Provider将Redux Store与Component连接；
- connect将Redux Store状态与Component的Props属性值关联；
- 添加actionCreators，子组件可以接收传递的函数；actionCreators指定type，去调用reducer函数，相当于store.dispatch(actionCreatorsxxx)。
- 通过dispatch改变Redux Store状态；将不可变数据作为输入，完成无状态组件的渲染。</br></br>

###### 五、webpack配置Eslint in Sublime：
- 安装全局eslint：cnpm install -g eslint
- 项目安装npm插件：yarn add eslint-config-rallycoding  --dev
- sublime安装插件：SublimeLinter+SublimeLinter-contrib-eslint
- 项目新建.eslintrc配置文件：{"extends": "rallycoding"}

###### 六、webpack配置CSS预加载、模块化等技术实现【just test】
- style-loader
- css-loader?modules&importLoaders=1&localIdentName=[name][local]_[hash:base64:5
- less-loader
- sass-loader
- postcss-loader+autoprefixer

### 整体流程：
###### 一、The user clicks a vote button. A VOTE action is dispatched.</br>【用户点击投票按钮，触发客户端 'VOTE' action】
###### 二、The remote action middleware sends the action over the Socket.io connection.</br>【redux的applyMiddleware配置的socket中间件将'VOTE' action发送到服务器】
###### 三、The client-side Redux store handles the action, causing the local hasVote state to be set.</br>【客户端处理此'VOTE' action就会将客户端Redux store投票条目标记'hasVoted'】
###### 四、When the message arrives on the server, the serverside Redux store handles the action, updating the vote in the tally.</br>【服务端处理此'VOTE' action会修改服务端Redux store条目的票数】
###### 五、The listener on the serverside Redux store broadcasts a state snapshot to all connected clients.</br>【由于服务端subscribe了服务端的Redux Store，一旦Store状态发生改变，就会触发客户端的'state'事件。】
###### 六、A SET_STATE action is dispatched to the Redux store of every connected client.</br>【客户端的监听的'state'事件回调是触发客户端Redux Store的SET_STATE事件】
###### 七、The Redux store of every connected client handles the SET_STATE action with the updated state from the server.</br>【客户端Redux Store的SET_STATE事件结果是合并服务端Redux Store状态到客户端Redux Store】
综上可知：</br>
服务端Redux Store存储投票条目+条票数</br>
客户端Redux Store存储投票条目(刷新就没有了)+接受服务端Redux Store的投票条目、条票数</br>