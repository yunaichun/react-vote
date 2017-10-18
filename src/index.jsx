/**引入React**/
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 此处不引入react-router
 * 将使用BrowserRouter代替Router
 * react-router：https://reacttraining.com/react-router/web/api/Route
 */
import { BrowserRouter as Router, Route } from 'react-router-dom';

/**引入组件**/
import App from './components/App';//根路由组件
import Results from './components/Results';//结果组件
import Voting from './components/Voting';//投票组件

/**
 * React Native4嵌套路由
 * 新路由写法：https://stackoverflow.com/questions/42095600/nested-routes-in-react-router-v4
 * this.props.children写法：http://jingyan.baidu.com/article/6f2f55a178f0f6b5b93e6c04.html
 */

const routers=<Router>
	<App>
        <Route path="/results" component={Results} />
    </App>
</Router>

ReactDOM.render( routers, document.getElementById('app'));
