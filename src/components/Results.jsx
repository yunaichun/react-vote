import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner';
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

//纯组件（哑组件）
export const Results = class Results extends React.Component{
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	getPair() {
	    return this.props.pair || [];
	}
	getVotes(entry) {
	    if (this.props.tally && this.props.tally.has(entry)) {
	        return this.props.tally.get(entry);
	    }
	    return 0;
	}
	render() {
		return this.props.winner ?
	    <Winner ref="winner" winner={this.props.winner} /> :
	    <div className="results">
			<div className="tally">
				{this.getPair().map(entry =>
					<div key={entry} className="entry">
					    <h1>{entry}</h1>
					    <div className="voteCount">
				            {this.getVotes(entry)}
			            </div>
					</div>
				)}
			</div>
		    <div className="management">
		        <button ref="next" onClick={this.props.next} className="next">
		            Next
		        </button>
		    </div>
		</div>;
	}
};


//智能组件【与Redux Store连接的组件，可以获取Redux Store指定的状态】
function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
		tally: state.getIn(['vote', 'tally']),
		winner: state.get('winner')
	}
}
/**
 * connect需要一个函数作为参数。执行后返回一个函数，再传递一个React组件作为参数。
 * 【就会将Redux Store与React Component连接】
 * 【将Redux Store状态与Component的Props属性值关联】
 */
export const ResultsContainer = connect(
	mapStateToProps,
	//添加actionCreators，子组件可以接收传递的函数；
	//actionCreators指定type，去调用reducer函数，相当于store.dispatch(actionCreators[xxx](state))。
	actionCreators
)(Results);
