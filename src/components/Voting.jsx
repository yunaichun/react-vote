import React from 'react';
import Winner from './Winner';
import Vote from './Vote';

/**
 * export default 与 export区别
 * 一、export default导出只能有一个
 * 二、export可以有多个
 */
export default class Voting extends React.Component {
	render(){
		return <div>
			{this.props.winner ? 
				<Winner ref="winner" winner={this.props.winner} /> :
				<Vote {...this.props} />}
			}
		</div>;
	}
}
