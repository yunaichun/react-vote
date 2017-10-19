import React from 'react';
import ReactDOM from 'react-dom';
/**引入react测试插件react-addons-test-utils**/
import ReactTestUtils from 'react-dom/test-utils'; // ES6
/*引入断言库*/
import {expect} from 'chai';
/*引入不可变数据结构immutable*/
import {List, Map} from 'immutable';
/*引入测试组件*/
import Results from '../../src/components/Results';


/**
 * describe：称为测试套件，表示一组相关的测试。
 * 第一个参数是测试套件的名称（"Voting函数的测试"），
 * 第二个参数是一个实际执行的函数。
 */
describe('Results', () => {
	/**
	 * it：称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。
	 * 第一个参数是测试用例的名称（"renders a pair of buttons"），
	 * 第二个参数是一个实际执行的函数。
	 */
	// 结果页：渲染条目+票数
	it('renders entries with vote counts or zero', () => {
		const pair = List.of('Trainspotting', '28 Days Later');
		const tally = Map({'Trainspotting': 5});
		//renderIntoDocument在单元测试中渲染React组件
		const component = ReactTestUtils.renderIntoDocument(
		  <Results pair={pair} tally={tally} />
		);
		//scryRenderedDOMComponentsWithTag获取渲染的React组件
		const entries = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'entry');
		const [train, days] = entries.map(e => e.textContent);

		expect(entries.length).to.equal(2);
		expect(train).to.contain('Trainspotting');
		expect(train).to.contain('5');
		expect(days).to.contain('28 Days Later');
		expect(days).to.contain('0');
	});
	// 模拟点击投票后跳转到投票结果页面
	it('invokes the next callback when next button is clicked', () => {
		// 设置点击函数
	    let nextInvoked = false;
	    const next = () => nextInvoked = true;

	    const pair = List.of('Trainspotting', '28 Days Later');
	    //renderIntoDocument在单元测试中渲染React组件
	    const component = ReactTestUtils.renderIntoDocument(
	        <Results pair={pair}  tally={Map()} next={next}/>
	    );
	    //Simulate分发渲染组件DOM事件
	    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.next));

	    expect(nextInvoked).to.equal(true);
    });
    // 测试获胜
    it('renders the winner when there is one', () => {
    	const pair = List.of('Trainspotting', '28 Days Later');
    	//renderIntoDocument在单元测试中渲染React组件
		const component = ReactTestUtils.renderIntoDocument(
			<Results pair={pair} tally={Map()} winner="Trainspotting"/>
		);
		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	});
});