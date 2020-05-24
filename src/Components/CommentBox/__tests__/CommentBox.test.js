import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'Components/CommentBox';
import Root from 'Root';
let component;
beforeEach(() => {
	component = mount(
		<Root>
			<CommentBox />
		</Root>
	);
});

//  Doing component cleanup using `unmount()` method. after each `it` function in this file.
afterEach(() => {
	component.unmount();
});

it('should have a textarea and button', () => {
	expect(component.find('textarea').length).toEqual(1);
	expect(component.find('button').length).toEqual(2);
});

// We have common logic for two test. Therefore we will wrapped them wirh `describe` function.
describe('the textarea ', () => {
	beforeEach(() => {
		const textarea = component.find('textarea');
		// to simulate a change event we use `simulate()` method provided by Enzyme.
		// `change` is actual name of event as an HTML event not react one.
		// The second argument of `simulate()` method is a fake event object which acts like a `event.target.value or `{target: { value: 'new comment' }}`
		textarea.simulate('change', {
			target: { value: 'new comment' },
		});
		// Forcing component to update
		component.update();
	});
	it('should have a textarea that users can type in', () => {
		// Making sure that the textarea receives the correct `value` prop.
		expect(component.find('textarea').prop('value')).toEqual('new comment');
	});

	it('should make textarea empty while form is submitting', () => {
		// Find form elevent inside component.
		const form = component.find('form');
		form.simulate('submit');
		// Force component to update and change value of textarea to empty.
		component.update();
		expect(component.find('textarea').prop('value')).toEqual('');
	});
});
