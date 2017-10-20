/**引入React**/
import React from 'react';
/**ReactDOM**/
import ReactDOM from 'react-dom';
/**此处不引入react-router【必须先引入React组件】**/
import { BrowserRouter, HashRouter } from 'react-router-dom';
/**引入Redex**/
import {createStore} from 'redux';
/**引入React-Redex：将React组件连接到Redux Store**/
import {Provider} from 'react-redux';
/**引入reducer**/
import reducer from './reducer';
/*引入入口组件*/
import App from './components/App';
/*引入智能组件*/
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';



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


/*渲染路由组件*/
ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
		    <App />
		</HashRouter>
	</Provider>, 
	document.getElementById('app')
);
