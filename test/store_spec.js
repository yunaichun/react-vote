import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import makeStore from '../src/store';

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
describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());
    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 Days Later']
    });
    expect(store.getState()).to.equal(fromJS({
      entries: ['Trainspotting', '28 Days Later']
    }));
  });
});