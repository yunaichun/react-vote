import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';


const pair = List.of('Trainspotting', '28 Days Later');
export default class Results extends React.Component{
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	getPair() {
	    // return this.props.pair || [];
	    return pair;
	}
	render() {
		return <div className="results">
	        {this.getPair().map(entry =>
		        <div key={entry} className="entry">
					<h1>{entry}</h1>
		        </div>
	        )}
	    </div>;
	}
};