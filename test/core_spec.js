/**
 * describe和it是mocha测试框架的语法
 * expect、should和assert是chai是第三方插件chai的语法
 * immutable是一种不变的数据结构【类似数组的slice方法，原数组不变】
 */
import { expect } from 'chai'; 
import { List, Map } from 'immutable';

import { setEntries, next, vote } from '../src/core';

/**
 * 整个应用的逻辑
    Map({
        vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),//正在投票的对象
            tally: Map({
                Trainspotting': 4, //正在投票对象获得的投票数
                '28 Days Later': 2 //正在投票对象获得的投票数
            })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')//待投票的条目【获胜方加入进来】
    })
 */
describe('application logic', () => {
    /**
     * [添加投票条目  Map的set调用]
     */
    describe('setEntries', () => {
        //添加投票条目
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries); //添加条目
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });
    /**
     * [投票  Map的updateIn调用]
     */
    describe('vote', () => {
        //开始投票
        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List()
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),//投票对象
                    tally: Map({
                        'Trainspotting': 1//票数
                    })
                }),
                entries: List()
            }));
        });
        //再次投票
        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,//深层嵌套，自加1
                        '28 Days Later': 2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),//投票对象
                    tally: Map({
                        'Trainspotting': 4, //票数
                        '28 Days Later': 2
                    })
                }),
                entries: List()
            }));
        });
    });
    /**
     * [Map的get、take和skip调用]
     */
    describe('next', () => {
        //获取前两个投票条目
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);
            console.log(nextState);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine') 
            }));
        });
        //将投票获胜方添加至条目【将获胜方添加至待投票对象，同时取出待投票对象的前两位】
        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4, //投票一方胜出，加入entries
                        '28 Days Later': 2
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting')
            }));
        });
        //投票总数相等的情况【将两者全部添加至待投票对象，同时取出待投票对象的前两位】
        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3, 
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });
        //只剩下一个条目时【将获胜方添加至待投票对象，此时只剩下一个投票对象，直接表明获胜方】
        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List() //只会有一个条目的时候，那就是Trainspotting获胜
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Trainspotting'
            }));
        });
    });
});