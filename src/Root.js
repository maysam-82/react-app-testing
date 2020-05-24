import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
// Set default value for initialState to `{}` since the app will not use that and we only use `initialState` for testing purpose.
export default ({ children, initialState = {} }) => {
	// When redux is going to create an store, we can optionally provide initialState for starting app.
	const store = createStore(reducers, initialState, applyMiddleware(thunk));
	return <Provider store={store}>{children}</Provider>;
};
