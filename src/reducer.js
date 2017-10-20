/*引入不可变数据结构immutable*/
import { Map } from 'immutable';


function setState(state, newState) {
	console.log('初始状态：', state);
	console.log('新状态：', newState);
	return state.merge(newState);
}
//传入初始state值，默认为Map()，则调用时可不传递第一个参数
export default function reducer(state = Map(), action) {
	switch (action.type) {
		case 'SET_STATE':
			return setState(state, action.state);
		default:
			return state;
	}
}
