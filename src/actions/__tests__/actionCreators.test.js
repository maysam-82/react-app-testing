import { saveComment } from 'actions/actionCreators';
import * as actionTypes from 'actions/actionTypes';

describe('saveComment action creator', () => {
	it('should have the correct type', () => {
		const action = saveComment();
		expect(action.type).toEqual(actionTypes.SAVE_COMMENT);
	});
	it('should have the correct payload', () => {
		const action = saveComment('new comment');
		expect(action.payload).toEqual('new comment');
	});
});
