/**引入React**/
import React from 'react';
/**此处不引入react-router【必须先引入React组件】**/
import { Switch, Route } from 'react-router-dom';

/*引入智能组件【与Redux Store连接的组件】*/
import { Voting,VotingContainer } from './Voting';
import { Results,ResultsContainer } from './Results';

/**引入immutable**/
import {List, Map} from 'immutable';
const pair = List.of('Trainspotting', '28 Days Later');
const tally = Map({'Trainspotting': 5, '28 Days Later': 4});

/** 
 * RN4嵌套路由
 * 【注意：HashRouter内部为一个函数】
 * 【注意：Switch包装的返回一个函数】
 */
const App = () => (
    <Switch>
		<Route exact path='/' render={(props) => {
			return <VotingContainer pair={pair}></VotingContainer>
		}}/>
		<Route path='/results' render={(props) => {
			return <ResultsContainer pair={pair} tally={tally}></ResultsContainer>
		}}/>
    </Switch>
);

export default App;