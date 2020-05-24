import * as actionTypes from 'actions/actionTypes';

export const saveComment = (comment) => {
	return {
		type: actionTypes.SAVE_COMMENT,
		payload: comment,
	};
};
