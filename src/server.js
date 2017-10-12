//Socket.io库，为跨浏览器工作的WebSockets提供了一个很好的抽象。
//它还有一些不支持WebSockets的客户端的后备机制。
import Server from 'socket.io';


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
export function startServer(store) {
	//端口需要匹配从客户端链接的端口
	const io = new Server().attach(8090);

	/**
	 * 订阅Redux Store，我们就可以知道什么时候Redux Store的状态改变了
	 */
	store.subscribe(
		/**
		 * [---状态发生变化时：立即发送状态快照---]
		 * Socket.io服务端触发state事件，结果是发送Redux Store的JSON序列化状态给所有连接的Socket.io客户端
		 */
		()=>io.emit('state',store.getState().toJS())//获取Redux Store当前状态
	);

	/**
	 * [---有新的客户端连接时:立即发出当前状态---]
	 * Socket.io服务端触发state事件，结果是发送Redux Store的JSON序列化状态给所有连接的Socket.io客户端
	 */
	io.on('connection', (socket) => {
	    socket.emit('state', store.getState().toJS());
	    /**
	     * 客户端触发后【客户端发送此"action"】
	     * 服务器接收到后【监听"action"事件】，然后去改变服务端Redux Store的状态
	     */
	    socket.on('action', store.dispatch.bind(store));//dispatch是调用Redux Stored的reducer
	})
}