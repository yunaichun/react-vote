import React from 'react';
import ReactDOM from 'react-dom';
/**引入react测试插件react-addons-test-utils**/
import ReactTestUtils from 'react-dom/test-utils'; // ES6
/*引入断言库*/
import {expect} from 'chai';
/*引入不可变数据结构immutable*/
import {List} from 'immutable';
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
	// 渲染投票条目
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
	// 投票onClick点击事件
	it('invokes callback when a button is clicked', () => {
		let votedWith;
		const vote=(entry)=>votedWith=entry;
		//renderIntoDocument在单元测试中渲染React组件
		const component = ReactTestUtils.renderIntoDocument(
	      <Voting pair={["Trainspotting", "28 Days Later"]} vote={vote}/>
	    );
	    //scryRenderedDOMComponentsWithTag获取渲染的React组件
	    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
	    //Simulate分发渲染组件DOM事件
	    ReactTestUtils.Simulate.click(buttons[0]);
	    expect(votedWith).to.equal('Trainspotting');
	});
	// 不能再次投票 hasVoted 
	it('disables buttons when user has voted',() => {
		//renderIntoDocument在单元测试中渲染React组件
		const component = ReactTestUtils.renderIntoDocument(
		<Voting pair={["Trainspotting", "28 Days Later"]}
		        hasVoted="Trainspotting" />
		);
		//scryRenderedDOMComponentsWithTag获取渲染的React组件
		const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
		expect(buttons[0].disabled).to.equal(true);
		expect(buttons[1].disabled).to.equal(true);
	});
	// 投票后有Voted标记
	it('adds label to the voted entry', () => {
		//renderIntoDocument在单元测试中渲染React组件
		const component = ReactTestUtils.renderIntoDocument(
		<Voting pair={["Trainspotting", "28 Days Later"]}
		        hasVoted="Trainspotting" />
		);
		//scryRenderedDOMComponentsWithTag获取渲染的React组件
		const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
		console.log(buttons[0].innerHTML);//<h1>Trainspotting</h1><div class="label">Voted</div>
		expect(buttons[0].textContent).to.contain('Voted');

		console.log(buttons[1].innerHTML);//<h1>28 Days Later</h1>
		expect(buttons[1].textContent).to.not.contain('Voted');
	});
	//组件传递winner属性直接渲染获胜组件winner.jsx
	it('renders just the winner when there is one', () => {
		//renderIntoDocument在单元测试中渲染React组件
		const component = ReactTestUtils.renderIntoDocument(
		<Voting winner="Trainspotting" />
		);
		//scryRenderedDOMComponentsWithTag获取渲染的React组件
		const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);

		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok; //断言目标是否为真(隐式转换)【节点存在则为true】
		expect(winner.textContent).to.contain('Trainspotting');
	});
	// React组件的渲染函数是一个纯函数，也就是说对于相同的值返回一样的结果同时不影响元素局。【纯组件的话，给可变数据结构的props，改变props，组件不会重新渲染】
	it('renders as a pure component', () => {
		const pair = ['Trainspotting', '28 Days Later'];
		const container = document.createElement('div');//同一个div两次ReactDOM.render可以查看是否重新渲染
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);
		//scryRenderedDOMComponentsWithTag获取渲染的React组件
		let firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');

		pair[0] = 'Sunshine';//不会产生影响
		component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);
		firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');
	});
	// 不可变数据结构immutable作为组件的prop的属性：组件的属性是不可变的。【纯组件的话，给不可变数据结构的props，改变props，组件会重新渲染】
	it('does update DOM when prop changes', () => {
		const pair = List.of('Trainspotting', '28 Days Later');
		const container = document.createElement('div');//同一个div两次ReactDOM.render可以查看是否重新渲染
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);
		//scryRenderedDOMComponentsWithTag获取渲染的React组件
		let firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');

		const newPair = pair.set(0, 'Sunshine');
		component = ReactDOM.render(
			<Voting pair={newPair} />,
			container
		);
		firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Sunshine');
	});
})