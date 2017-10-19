/**此处不引入react-router**/
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';

/*引入组件*/
import Voting from './Voting';
import Results from './Results';

/**引入immutable**/
import {List, Map} from 'immutable';
const pair = List.of('Trainspotting', '28 Days Later');
const tally = Map({'Trainspotting': 5, '28 Days Later': 4});

/**RN4嵌套路由【注意：HashRouter内部为一个函数】**/
const App = () => (
    <Switch>
		<Route exact path='/' render={(props) => {
			return <Voting pair={pair}></Voting>
		}}/>
		<Route path='/results' render={(props) => {
			return <Results pair={pair} tally={tally}></Results>
		}}/>
    </Switch>
);
const router =(
	<HashRouter>
	    <App />
	</HashRouter>
);
export default router;