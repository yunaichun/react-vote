import React from 'react';

/**
 * export default 与 export区别
 * 一、export default导出只能有一个
 * 二、export可以有多个
 */
export default class Voting extends React.Component {
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
	render(){
		return <div className="voting">
			{this.props.winner ? 
				<div ref="winner">Winner is {this.props.winner}!</div> :
				{this.getPair().map(entry =>
					<button key={entry} disabled={this.isDisabled} onClick={()=>{this.props.vote(entry)}}>
					    <h1>{entry}</h1>
					    {this.hasVotedFor(entry) ? 
						    <div className="label">Voted</div> :
						    null
					    }
					</button>
				)}
			}
		</div>;
	}
}
