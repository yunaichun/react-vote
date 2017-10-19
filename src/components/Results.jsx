import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';


export default class Results extends React.Component{
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	getPair() {
	    return this.props.pair || [];
	}
	getVotes(entry) {
		console.log(entry);
		console.log(this.props.tally);
	    if (this.props.tally && this.props.tally.has(entry)) {
	        return this.props.tally.get(entry);
	    }
	    return 0;
	}
	render() {
		return <div className="results">
			{this.getPair().map(entry =>
				<div key={entry} className="entry">
				    <h1>{entry}</h1>
				    <div className="voteCount">
			            {this.getVotes(entry)}
		            </div>
				</div>
			)}
		</div>;
	}
};