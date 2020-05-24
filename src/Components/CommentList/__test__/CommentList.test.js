import React from 'react';
import { mount } from 'enzyme';
import CommentList from 'Components/CommentList';
import Root from 'Root';

let component;
beforeEach(() => {
	const initialState = { comments: ['Comment 1', 'Comment 2'] };
	// At the start-up, Root is going to render itself and create redux store which will have an initialState with `{comment:['Comment 1', 'Comment 2']}`.
	// If you use `combineReducers` to produce the root reducer function, this must be an object with the same shape as `combineReducers` keys.
	// After that CommentList will try to render itself and run `mapStateToProps` function and use that initialState with `mapStateToProps`. Then, CommentList will render these two comments.
	component = mount(
		<Root initialState={initialState}>
			<CommentList />
		</Root>
	);
});
it('should create one `li` per comment', () => {
	expect(component.find('li').length).toEqual(2);
});

it('should show relevant text for each comment', () => {
	expect(component.render().text()).toContain('Comment 1');
	expect(component.render().text()).toContain('Comment 2');
});
