/*
1、The user clicks a vote button. A VOTE action is dispatched.
2、The remote action middleware sends the action over the Socket.io connection.
3、The client-side Redux store handles the action, causing the local hasVote state to be set.
4、When the message arrives on the server, the serverside Redux store handles the action, updating the vote in the tally.
5、The listener on the serverside Redux store broadcasts a state snapshot to all connected clients.
6、A SET_STATE action is dispatched to the Redux store of every connected client.
7、The Redux store of every connected client handles the SET_STATE action with the updated state from the server.
*/
export default socket =>store => next => action => {
	console.log('in middleware', action);
	//只有特定的action才会发送到服务器
	if (action.meta && action.meta.remote) {
		//触发服务器的'action'事件
		socket.emit('action', action);
	}
	return next(action);
};

// export default function(store) {
//   //返回下一步
//   return function(next) {
//     //返回action
//     return function(action) {

//     }
//   }
// }
