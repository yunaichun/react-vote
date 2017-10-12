import makeStore from './src/store';//引入Redux Store
import {startServer} from './src/server';//引入Socket.io server
/**
 * [store 导出一个store]
 */
export const store = makeStore();
startServer(store);