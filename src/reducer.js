/*引入不可变数据结构immutable*/
import { Map } from 'immutable';


/**
 * [setState 合并状态逻辑函数]
 * @param {[type]} state    [Redex Store初始状态]
 * @param {[type]} newState [Redex Store通过action派发的新状态]
 * @return {[type]} mergeState [返回mergeState存储给Redex Store]
 */
function setState(state, newState) {
	console.log('初始状态：', state);
	console.log('新状态：', newState);
	return state.merge(newState);
}
function vote(state, entry) {
	const currentPair = state.getIn(['vote', 'pair']);
	if (currentPair && currentPair.includes(entry)) {
		return state.set('hasVoted', entry);
	} else {
		return state;
	}
}

/**
 * 传入初始state值，默认为Map()，则调用时可不传递第一个参数
 * 第二个参数是dispatch传入的参数
 * 所以dispatch相当于执行reducer函数
 */
export default function reducer(state = Map(), action) {
	console.log('action到底是啥：', action);
	switch (action.type) {
		case 'SET_STATE':
			return setState(state, action.state);
		case 'VOTE':
			return vote(state, action.entry);
		default:
			return state;
	}
}
