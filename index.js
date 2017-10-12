import makeStore from './src/store';//引入Redux Store
import {startServer} from './src/server';//引入Socket.io server

/**
 * 整体流程：
 * 一、客户端向服务器发送指定的action
 * 二、服务器将操作权交给Redux Store
 * 三、Redux Store调用reducer并且reducer执行与action相关的逻辑。
 * 四、Redux Store更新状态，基于reducer返回的值
 * 五、Redux Store执行被服务器subscribe订阅的监听函数
 * 六、服务器发出'state'事件
 * 七、所有连接的客户端（包括启动原始操作的客户端）接收Redux Store最新的状态
 */
export const store = makeStore();
startServer(store);



/**
 * 通过dispatch调用reducer
 */
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')//加载投票条目
});
store.dispatch({type: 'NEXT'});//通过发送Next类型的action去触发投票