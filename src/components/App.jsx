/**引入React**/
import React from 'react';
/**引入immutable**/
import {List,Map} from 'immutable';
/**引入组件**/
import Voting from './Voting';//投票组件

const pair = List.of('Trainspotting', '28 Days Later');
const tally = Map({'Trainspotting': 5, '28 Days Later': 4});
export default class App extends React.Component{
    render() {
	  	// this.props.children表示组件的所有子节点
	    // return React.cloneElement(this.props.children, {pair: pair});
	    return  <div>
					<Voting pair={pair} tally={tally}/>
			</div>;
    }
};
