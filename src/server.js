//Socket.io库，为跨浏览器工作的WebSockets提供了一个很好的抽象。
//它还有一些不支持WebSockets的客户端的后备机制。
import Server from 'socket.io';

export default function startServer() {
	//端口需要匹配从客户端链接的端口
	const io = new Server().attach(8090);
}