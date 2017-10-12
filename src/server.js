//Socket.io库，为跨浏览器工作的WebSockets提供了一个很好的抽象。
//它还有一些不支持WebSockets的客户端的后备机制。
import Server from 'socket.io';

export default function startServer(store) {
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
		()=>io.emit('state',store.getState().toJS())
	);

	/**
	 * [---有新的客户端连接时:立即发出当前状态---]
	 * Socket.io服务端触发state事件，结果是发送Redux Store的JSON序列化状态给所有连接的Socket.io客户端
	 */
	io.on('connection', (socket) => {
	    socket.emit('state', store.getState().toJS());
	})
}