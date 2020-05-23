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
