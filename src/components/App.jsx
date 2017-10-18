/**引入React**/
import React from 'react';
/**引入immutable**/
import {List} from 'immutable';


const pair = List.of('Trainspotting', '28 Days Later');

export default class App extends React.Component{
	constructor(props){
		super(props);
	}
    render() {
    	console.log(this);
    	console.log(this.props.children);
	    //return React.cloneElement(this.props.children, {pair: pair});
	    return (
	    	<div>
			    {this.props.children}
		    </div>
	    );
    }
};
