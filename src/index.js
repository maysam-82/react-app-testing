import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App';
import Root from 'Root';

const store = createStore(reducers);

ReactDOM.render(
	<Root>
		<App />
	</Root>,
	document.querySelector('#root')
);
