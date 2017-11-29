import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

/**
 * --------reducer---------
 * 含义：找出哪个函数调用并调用它。功能和外界之间有一层间接：action。
 * 优点：与直接调用核心功能相比，批处理或重复调用核心功能使状态改变是action/reducer模型的主要优点。
 
    // This action
    let voteAction = {type: 'VOTE', entry: 'Trainspotting'}
    // should cause this to happen
    return vote(state, voteAction.entry);
 */
describe('reducer', () => {
    //添加投票条目
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });
    //执行投票
    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                round: 1,
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = { type: 'VOTE', entry: 'Trainspotting' };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 1,
                pair: ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            },
            entries: []
        }));
    });
    //投票决胜
    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = { type: 'NEXT' };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 1,
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });
    //添加投票条目：初始状态未定义未Map()
    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });
    //与直接调用核心功能相比，批处理和重复或重复调用核心功能使状态改变是action/reducer模型的主要优点。
    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'VOTE', entry: '28 Days Later'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'NEXT'}
        ];
        //actions是数组，有reduce方法
        //reducer方法第一次执行：传入Map()和actions数组的第一项
        //reducer方法第二次执行：传入上一步的state和actions数组的第二项
        //以此类推……
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Trainspotting'
        }));
    });
});