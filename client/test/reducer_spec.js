/*引入不可变数据结构immutable*/
import { List, Map, fromJS } from 'immutable';
/*引入断言库*/
import { expect } from 'chai';

/*引入reducer*/
import reducer from '../src/reducer';

/**
 * describe：称为测试套件，表示一组相关的测试。
 * 第一个参数是测试套件的名称（"Voting函数的测试"），
 * 第二个参数是一个实际执行的函数。
 */
describe('reducer', () => {
	/**
	* it：称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。
	* 第一个参数是测试用例的名称（"renders a pair of buttons"），
	* 第二个参数是一个实际执行的函数。
	*/
	//测试客户端reducer逻辑：SET_STATE【reducer：找出哪个函数调用并调用它。功能和外界之间有一层间接：action】
	it('handles SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({ Trainspotting: 1 })
				})
			})
		};
		const nextState = reducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		}));
	});
	//测试客户端reducer逻辑：SET_STATE【不传入初始状态】
	it('handles SET_STATE without initial state', () => {
		const action = {
			type: 'SET_STATE',
				state: {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: { Trainspotting: 1 }
				}
			}
		};
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		}));
	});
	//测试客户端reducer逻辑：SET_STATE
	//------【检查新状态中的条目是否包含用户已经投票的条目】
	//------【如果没有，我们应该删除hasVoted条目】
	it('removes myVote on SET_STATE if round has changed', () => {
		const initialState = fromJS({
			vote: {
				round: 42,
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			},
			myVote: {
				round: 42,
				entry: 'Trainspotting'
			}
		});
		const action = {
			type: 'SET_STATE',
			state: {
				round: 42,
				vote: {
					pair: ['Sunshine', 'Trainspotting']
				}
			}
		};
		const nextState = reducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			vote: {
				round: 43,
				pair: ['Sunshine', 'Trainspotting']
			}
		}));
	});


	//测试客户端reducer逻辑：VOTE
	it('handles VOTE by setting myVote', () => {
		const state = fromJS({
			vote: {
				round: 42, 	
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		});
		const action = { type: 'VOTE', entry: 'Trainspotting' };
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				round: 42,
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			},
			myVote: {
				round: 42,
				entry: 'Trainspotting'
			}
		}));
	});
	//测试客户端reducer逻辑：VOTE【加入传的参数没有此条目，不应该计入已投票】
	it('does not set myVote for VOTE on invalid entry', () => {
		const state = fromJS({
			vote: {
				round: 42,
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		});
		const action = { type: 'VOTE', entry: 'Sunshine' };
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				round: 42,
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		}));
	});
});
