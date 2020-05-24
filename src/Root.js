import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'reducers';

// Set default value for initialState to `{}` since the app will not use that and we only use `initialState` for testing purpose.
export default ({ children, initialState = {} }) => {
	// When redux is going to create an store, we can optionally provide initialState for starting app.
	return (
		<Provider store={createStore(reducers, initialState)}>{children}</Provider>
	);
};
