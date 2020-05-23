# Writing Tests

## Test file names

To create test file:

- Create `__tests__` folder inside component directory.
- Create a file with extension of either `*.test.js` or `*.spec.js` inside `__tests__`.

## Create test logics:

```JavaScript
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

```

To simulate a browser inside Command Line Environment, `create-react-app` installs a dependency called `JSDOM`.
This way of testing is not optimal since changing a text in `CommentBox` component will cause an error in this test file. Therefore, we are going to write a test for a component which only have general knowledge of other component inside it. For example, we will write a code for `App` component that tells us that overal `CommentBox` exists.

## Setup Enzyme

- Enter `npm i enzyme enzyme-adapter-react-16`
- To config Enzyme, Create a file with exact name of `setupTests.js` inside `src` folder. The name of file is important because every time `Jest` is going to run, it will look at `Enzyme` config file with that name.

```JavaScript
imimport Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new Adapter(),
});
```

Enzyme is an open source package to let us test React Components.
