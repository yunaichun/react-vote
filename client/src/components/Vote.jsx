import React from 'react';
//比较当前的props、state和接下来的props、state，当两者相等的时候返回false，不进行更新
import PureRenderMixin from 'react-addons-pure-render-mixin';
/*引入CSS  module*/
import style from '../style.css';

/**
 * export default 与 export区别
 * 一、export default导出只能有一个
 * 二、export可以有多个
 */
export default class Voting extends React.Component {
	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	    this.state = {date: new Date()};
	  }
	// 获取父组件传递值pair
	getPair() {
		return this.props.pair || [];
	}
	// 获取父组件传递值hasVoted
	isDisabled(){
		return !!this.props.hasVoted;
	}
	// 是否已经投票标记
	hasVotedFor(entry){
		return this.props.hasVoted === entry;
	}
	// onClick是顶层组件传递的
	render(){
		return <div className={style.voting}>
			{this.getPair().map(entry =>
				<button 
					key={entry} 
					disabled={this.isDisabled()} 
					onClick={()=>{this.props.vote(entry)}}
				>
				    <h1>{entry}</h1>
				    {this.hasVotedFor(entry) ? 
					    <div className={style.label}>Voted</div> :
					    null
				    }
				</button>
			)}
		</div>;
	}
}
