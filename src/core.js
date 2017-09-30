import { List, Map } from 'immutable';

/**
 * [setEntries Map的set调用]
 * @param {[type]} state   [Map实例]
 * @param {[type]} entries [key对应的value值]
 * @return {Function}      [将重新set设置的Map返回]
 */
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}


/**
 * [vote：投票  Map的updateIn调用]
 * @param  {[type]} state [Map实例]
 * @param  {[type]} entry [最深层嵌套的key值]
 * @return {[type]}       [将重新updateIn设置的Map返回]
 */
export function vote(state, entry) {
    return state.updateIn( //深层嵌套【'vote'->'tally'->entry】
        ['vote', 'tally', entry],
        0, //entry默认值是0
        tally => tally + 1 //function(entry){entry=entry+1}
    );
}


/**
 * [next Map的get、take和skip调用]
 * @param  {[type]}   state [Map实例]
 * @return {Function}       [将重新merge设置的Map返回]
 */
export function next(state) {
    const entries = state.get('entries')
        .concat(getWinners(state.get('vote')));
    if (entries.size === 1) {//如果只剩下一个条目时，直接标明胜利方
        return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({ pair: entries.take(2) }),//获取前2
            entries: entries.skip(2)//获取除前2的所有
        });
    }
}
function getWinners(vote) { //将获奖者连接到条目上
    if (!vote) return [];
    const [a, b] = vote.get('pair'); //即为Trainspotting
    const aVotes = vote.getIn(['tally', a], 0); //深层嵌套：tally->a，无值则为0
    const bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else return [a, b];
}