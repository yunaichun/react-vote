/*引入不可变数据结构immutable*/
import { Map } from 'immutable';


function setState(state, newState) {
	console.log(state);
	console.log(newState);
	return state.merge(newState);
}
export default function( state = Map(), action) {
	switch (action.type) {
		case 'SET_STATE':
			return setState(state, action.state);
	}
	return state;
}
