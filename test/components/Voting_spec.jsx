import React from 'react';
/**引入react测试插件react-addons-test-utils**/
import ReactTestUtils from 'react-dom/test-utils'; // ES6
/*引入断言库*/
import {expect} from 'chai';
/*引入测试组件*/
import Voting from '../../src/components/Voting';


// 测试客户端投票逻辑
describe('Voting',()=>{
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
	})
})