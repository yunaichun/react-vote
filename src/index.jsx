/**引入React**/
import React from 'react';
import ReactDOM from 'react-dom';
//引入react-router：https://reacttraining.com/react-router/web/api/Route
import { BrowserRouter as Router, Route } from 'react-router-dom';

/**引入组件**/
import App from './components/App';//根路由组件
import Results from './components/Results';//结果组件
import Voting from './components/Voting';//投票组件


//配置路由
ReactDOM.render(
	<Router >
		<div>
			<Route path="/" component={App}/>
			<Route path="/results" component={App}/>
		</div>
	</Router>,
	document.getElementById('app')
);