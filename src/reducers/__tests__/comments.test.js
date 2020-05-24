import commentReducer from 'reducers/comments';
import * as actionTypes from 'actions/actionTypes';

it('should handle actions of type SAVE_COMMENT', () => {
	const fakeAction = {
		type: actionTypes.SAVE_COMMENT,
		payload: 'new comment',
	};
	const newState = commentReducer([], fakeAction);
	expect(newState).toEqual(['new comment']);
});

it('should handle action with unknown type', () => {
	const newState = commentReducer([], { type: 'UNKNOWN' });
	expect(newState).toEqual([]);
});
