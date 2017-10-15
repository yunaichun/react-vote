import React from 'react';

/**
 * export default 与 export区别
 * 一、export default导出只能有一个
 * 二、export可以有多个
 */
export default class Voting extends React.Component {
	getPair() {
		return this.props.pair || [];
	}

	render(){
		return <div className="voting">
		{this.getPair().map(entry =>
			<button key={entry} onClick={()=>{this.props.vote(entry)}}>
			    <h1>{entry}</h1>
			</button>
		)}
		</div>;
	}
}
