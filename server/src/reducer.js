import { setEntries, next, vote ,INITIAL_STATE} from './core';
/**
 * reducer：找出哪个函数调用并调用它。功能和外界之间有一层间接：action。
 
    // This action
    let voteAction = {type: 'VOTE', entry: 'Trainspotting'}
    // should cause this to happen
    return vote(state, voteAction.entry);
 */
export default function reducer(state=INITIAL_STATE, action) {//state=INITIAL_STATE为了防止传入undefined
    console.log('客户端发送的store', state,action);//可以测试数组的reduce方法参数传递
    switch (action.type) {
    	//添加投票条目
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);//调用此函数其实就是返回一个新state【在core_spec.js可以看出来】
        //执行投票
        case 'VOTE':
            return state.update('vote',voteState => vote(voteState, action.entry));//voteState传入参数state
        //投票决胜
        case 'NEXT':
            return next(state);
    }
    //如果reducer无法识别action的类别，则返回当前状态
    return state;
}