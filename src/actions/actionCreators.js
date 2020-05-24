import axios from 'axios';
import * as actionTypes from 'actions/actionTypes';

export const saveComment = (comment) => {
	return {
		type: actionTypes.SAVE_COMMENT,
		payload: comment,
	};
};

export const fetchComments = () => async (dispatch) => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/comments'
	);
	dispatch({
		type: actionTypes.FETCH_COMMENTS,
		payload: response.data,
	});
};
