import * as actionTypes from 'actions/actionTypes';

const commentReducer = (state = [], action) => {
	switch (action.type) {
		case actionTypes.SAVE_COMMENT:
			return [...state, action.payload];
		case actionTypes.FETCH_COMMENTS:
			const names = action.payload.map((comment) => comment.name);

			return [...state, ...names];
		default:
			return state;
	}
};

export default commentReducer;
