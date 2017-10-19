/**引入React**/
import React from 'react';
import ReactDOM from 'react-dom';
/**此处不引入react-router**/
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';


/**引入组件**/
import App from './components/App';
import Results from './components/Results';


/**RN4嵌套路由**/
const Main = () => (
    <Switch>
		<Route exact path='/' render={(props) => {
			return <App></App>
		}}/>
		<Route path='/results' component={Results}/>
    </Switch>
);
/*渲染路由组件*/
ReactDOM.render(<HashRouter>
    <Main />
  </HashRouter>, document.getElementById('app'));
