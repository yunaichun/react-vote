import React from 'react';
/**引入react测试插件react-addons-test-utils**/
import ReactTestUtils from 'react-dom/test-utils'; // ES6
/*引入断言库*/
import {expect} from 'chai';
/*引入测试组件*/
import Voting from '../../src/components/Voting';


/**
 * describe：称为测试套件，表示一组相关的测试。
 * 第一个参数是测试套件的名称（"Voting函数的测试"），
 * 第二个参数是一个实际执行的函数。
 */
describe('Voting',()=>{
	/**
	 * it：称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。
	 * 第一个参数是测试用例的名称（"renders a pair of buttons"），
	 * 第二个参数是一个实际执行的函数。
	 */
	it('renders a pair of buttons', () => {
		//renderIntoDocument在单元测试中渲染React组件
		const component = ReactTestUtils.renderIntoDocument(
	      <Voting pair={["Trainspotting", "28 Days Later"]} />
	    );
	    //scryRenderedDOMComponentsWithTag获取渲染的React组件
	    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

	    expect(buttons.length).to.equal(2);
	    expect(buttons[0].textContent).to.equal('Trainspotting');
	    expect(buttons[1].textContent).to.equal('28 Days Later');
	});
	it('invokes callback when a button is clicked', () => {
		let votedWith;
		const vote=(entry)=>votedWith=entry;
		console.log(vote.toString());
		//renderIntoDocument在单元测试中渲染React组件
		const component = ReactTestUtils.renderIntoDocument(
	      <Voting pair={["Trainspotting", "28 Days Later"]} vote={vote}/>
	    );
	    //scryRenderedDOMComponentsWithTag获取渲染的React组件
	    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
	    //Simulate分发渲染组件DOM事件
	    ReactTestUtils.Simulate.click(buttons[0]);

	    expect(votedWith).to.equal('Trainspotting');
	})
})