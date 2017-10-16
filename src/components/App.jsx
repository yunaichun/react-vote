/**引入React**/
import React from 'react';
/**引入immutable**/
import {List} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later');
export default class App extends React.Component{
  render() {
  	//this.props.children表示组件的所有子节点
    return React.cloneElement(this.props.children, {pair: pair});
  }
};
