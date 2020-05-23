import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
// `it` is a global function and we do not require or import it into a test file.
// `it` function is used to organize all tests inside a signle file.
// `it` function takes two arguments, the first one is the description of test we are going to write and the second one is a function that contains test logics we write.
it('should show a CommentBox', () => {
	// creates a fake div inside JSDOM not in browser.
	const div = document.createElement('div');

	// React will take App component and take the HTML that produced by that component and stick it into the fake dive we have already created.
	ReactDOM.render(<App />, div);

	// Looks inside a fake div and checks to see if the CommentBox component exists.
	// expect is a global function. (our expectation)
	// the first argument of expect function is an object or property or value we are going to verify or inspect.
	// After function argument we use matchers functions which designates how we want to inspect the value. The matcher might have an argument or not. The argument is a value which we are going to expect to see.
	expect(div.innerHTML).toContain('CommentBox');

	// clean up after the test run by taking the fake div and remove it to improve performance of tests.
	ReactDOM.unmountComponentAtNode(div);
});
