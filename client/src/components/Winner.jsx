import React from 'react';
/*比较当前的props、state和接下来的props、state，当两者相等的时候返回false，不进行更新*/
import PureRenderMixin from 'react-addons-pure-render-mixin';
/*引入CSS  module*/
import style from '../style.css';

export default class Winner extends React.Component{
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return <div className={style.winner}>
			Winner is {this.props.winner}!
		</div>;
	}
}