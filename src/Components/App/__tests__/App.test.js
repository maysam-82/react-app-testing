import React from 'react';
import { shallow } from 'enzyme';
import App from 'Components/App';
import CommentBox from 'Components/CommentBox';
import CommentList from 'Components/CommentList';

it('should show a CommentBox', () => {
	const component = shallow(<App />);
	// find method will return array that contains all instances of `CommentBox`
	expect(component.find(CommentBox).length).toEqual(1);
});

it('should show a CommentList', () => {
	const component = shallow(<App />);
	// find method will return array that contains all instances of `CommentBox`
	expect(component.find(CommentList).length).toEqual(1);
});
