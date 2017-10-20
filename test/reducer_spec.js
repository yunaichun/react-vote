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
  //reducer：找出哪个函数调用并调用它。功能和外界之间有一层间接：action。
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
  //不传入初始状态，传入undefined
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
});
