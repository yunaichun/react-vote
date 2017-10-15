import React from 'react';
import Winner from './Winner';
import Vote from './Vote';
//比较当前的props、state和接下来的props、state，当两者相等的时候返回false，不进行更新
import PureRenderMixin from 'react-addons-pure-render-mixin';

/**
 * export default 与 export区别
 * 一、export default导出只能有一个
 * 二、export可以有多个
 */
export default class Voting extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return <div>
			{this.props.winner ? 
				<Winner ref="winner" winner={this.props.winner} /> :
				<Vote {...this.props} />}
			}
		</div>;
	}
}
