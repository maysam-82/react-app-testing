import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'Components/CommentBox';
let component;
beforeEach(() => {
	component = mount(<CommentBox />);
});

//  Doing component cleanup using `unmount()` method. after each `it` function in this file.
afterEach(() => {
	component.unmount();
});

it('should have a textarea and button', () => {
	expect(component.find('textarea').length).toEqual(1);
	expect(component.find('button').length).toEqual(1);
});

it('should have a textarea that users can type in', () => {
	const textare = component.find('textarea');
	// to simulate a change event we use `simulate()` method provided by Enzyme.
	// `change` is actual name of event as an HTML event not react one.
	// The second argument of `simulate()` method is a fake event object which acts like a `event.target.value or `{target: { value: 'new comment' }}`
	textare.simulate('change', {
		target: { value: 'new comment' },
	});
	// Forcing component to update
	component.update();
	// Making sure that the textarea receives the correct `value` prop.
	expect(component.find('textarea').prop('value')).toEqual('new comment');
});
