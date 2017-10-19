/**引入React**/
import React from 'react';
/*引入Voting投票组件*/
import Voting from './Voting'
/**引入immutable**/
import {List} from 'immutable';
const pair = List.of('Trainspotting', '28 Days Later');


export default class App extends React.Component{
	constructor(props){
		super(props);
	}
    render() {
	    return <Voting pair={pair}></Voting>
    }
};
