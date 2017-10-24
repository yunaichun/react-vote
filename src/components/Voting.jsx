import React from 'react';
import Winner from './Winner';
import Vote from './Vote';
//比较当前的props、state和接下来的props、state，当两者相等的时候返回false，不进行更新
import PureRenderMixin from 'react-addons-pure-render-mixin';
/**
 * 引入action_creater.js【调用reducer，不用传入type参数了】
 * 主要功能是组件本身可以dispatch事件到Redux Store
 */
import * as actionCreators from '../action_creators';
/**
 * 作用：
 * 将Redux Store的状态映射到组件的props属性中
 * 然后Redux Store的状态将会和组件的props属性合并
 * mapStateToProps是返回Redux Store中需要合并的状态【因为有很多状态我们并不需要】
 *
 */
import {connect} from 'react-redux';


/**
 * export default 与 export区别
 * 一、export default导出只能有一个
 * 二、export可以有多个
 */
//纯组件（哑组件）
export const Voting = class Voting extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return <div>
			{this.props.winner ? 
				<Winner ref="winner" winner={this.props.winner} /> :
				<Vote {...this.props} />
			}
		</div>;
	}
}

//智能组件【与Redux Store连接的组件，可以获取Redux Store指定的状态】
function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
		hasVoted: state.get('hasVoted'),
		winner: state.get('winner')
	};
}
/**
 * connect需要一个函数作为参数。执行后返回一个函数，再传递一个React组件作为参数。
 * 【就会将Redux Store与React Component连接】
 * 【将Redux Store状态与Component的Props属性值关联】
 */
export const VotingContainer = connect(
	mapStateToProps,
	//添加actionCreators，子组件可以接收传递的函数；
	//actionCreators指定type，去调用reducer函数，相当于store.dispatch(actionCreators[xxx](state))。
	actionCreators/*主要功能是组件本身可以dispatch事件到Redux Store*/
)(Voting);
