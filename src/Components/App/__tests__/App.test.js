import React from 'react';
import { shallow } from 'enzyme';
import App from 'Components/App';
import CommentBox from 'Components/CommentBox';
import CommentList from 'Components/CommentList';

// to remove duplicated logic inside test we use beforeEach method that belongs to `jest`. Any logic inside beforeEach will be executed before each `it` test.
let component;
beforeEach(() => {
	component = shallow(<App />);
});

it('should show a CommentBox', () => {
	// find method will return array that contains all instances of `CommentBox`
	expect(component.find(CommentBox).length).toEqual(1);
});

it('should show a CommentList', () => {
	// find method will return array that contains all instances of `CommentList`
	expect(component.find(CommentList).length).toEqual(1);
});
