/**引入React**/
import React from 'react';
/**ReactDOM**/
import ReactDOM from 'react-dom';
/**此处不引入react-router【必须先引入React组件】**/
import { BrowserRouter, HashRouter } from 'react-router-dom';
/**引入Redex**/
import {createStore} from 'redux';
/**
 * 引入React-Redex：从Redux Store中获取数据渲染到React组件中
 * 一、createStore初始化不可变应用状态Redux Store；
 * 二、Provider将Redux Store与Component连接；
 * 三、connect将Redux Store状态与Component的Props属性值关联；
 * 四、通过dispatch改变Redux Store状态；将不可变数据作为输入，完成无状态组件的渲染。
 */
import {Provider} from 'react-redux';
/**引入reducer**/
import reducer from './reducer';
/*引入入口组件*/
import App from './components/App';
/**
 * Socket.io库，为跨浏览器工作的WebSockets提供了一个很好的抽象。
 * 它还有一些不支持WebSockets的客户端的后备机制。
 * 客户端连接服务端socket操作
 */
import io from 'socket.io-client';
console.log(`${location.protocol}`);
console.log(`${location.protocol}//${location.hostname}:8090`);
const socket = io(`${location.protocol}//${location.hostname}:8090`);
/**
 * 客户端监听'state'事件
 * 服务端监听到有客户端连接的时候会触发客户端的'state'事件
 */
socket.on('state', state => {
  console.log("来自服务端的state：",state);
  store.dispatch({type: 'SET_STATE', state})
});



/**
store：使用reducer函数进行初始化。
       通常不会通过action/reducer一次性批处理和重复或重复调用核心功能。
       但是会随着时间推移发生这些action，就需要store存储应用程序的状态。

      //初始化Reduce Store
      const store = createStore(reducer);
      //调用reducer
      store.dispatch({type: 'NEXT'});
      //获取当前状态
      store.getState();
 */
const store = createStore(reducer);
/**通过dispatch调用reducer**/
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Sunshine', '28 Days Later'],
      tally: {Sunshine: 2}
    }
  }
});

/**
 * 渲染路由组件
 * Provider：将组件树链接到Redux store。使我们能够稍后对各个组件进行映射。
 */
ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
		    <App />
		</HashRouter>
	</Provider>, 
	document.getElementById('app')
);
