import {createStore} from 'redux';
import reducer from './reducer';

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
export default function makeStore() {
  return createStore(reducer);
}