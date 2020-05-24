import * as actionTypes from 'actions/actionTypes';

const commentReducer = (state = [], action) => {
	switch (action.type) {
		case actionTypes.SAVE_COMMENT:
			return [...state, action.payload];
		default:
			return state;
	}
};

export default commentReducer;
