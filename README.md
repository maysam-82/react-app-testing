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

Enzyme is an open source package to let us test React Components. It provides three methods to create an instance of components and use `expect` method for them.

- Static: It renders our specific component and will return just a plain HTML.
- Shallow: It takes a component and only renders that component without any of its children.
- Full DOM: It takes a component an renders that component with all its children. Events simulations can be handled in this method. This is a full copy of application indeed.

```JavaScript
import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import CommentBox from '../../CommentBox/CommentBox';
import CommentList from '../../CommentList/CommentList';

it('should show a CommentBox', () => {
	const component = shallow(<App />);
	// find method will return array that contains all instances of `CommentBox`
	expect(component.find(CommentBox).length).toEqual(1);
});

it('should show a CommentList', () => {
	const component = shallow(<App />);
	// find method will return array that contains all instances of `CommentBox`
	expect(component.find(CommentList).length).toEqual(1);
});

```

To remove relative path while importing components and make them absolute to `src` folder:

- Create a file with exact name of `jsconfig.json` in root of project.

```json
{
	"compilerOptions": {
		"baseUrl": "src"
	},
	"include": ["src"]
}
```

## Note: After one test is passed, try to make that test break to be sure that test is completely passed.

To add some common logic inside a test file and remove duplicated code inside each test, we use `beforeEach()` method. It take a function and will be executed before each `it` (test).

```JavaScript
// to remove duplicated logic inside test we use beforeEach method that belongs to `jest`. Any logic inside beforeEach will be executed before each `it` test.
let component;
beforeEach(() => {
	component = shallow(<App />);
});

it('should show a CommentBox', () => {
	// find method will return array that contains all instances of `CommentBox`
	expect(component.find(CommentBox).length).toEqual(1);
});

it('should show a CommentList', () => {
	// find method will return array that contains all instances of `CommentList`
	expect(component.find(CommentList).length).toEqual(1);
});

```

While using `mount` method of `Enzyme`, since it mounts the component to the fake DOM (using `JSDOM`), one test can affect another one that uses the same DOM. Keep that in mind while writing a test to use `unmount` method or something similar as cleanup.

```JavaScript
import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'Components/CommentBox';
let component;
beforeEach(() => {
	component = mount(<CommentBox />);
});

//  Doing component cleanup using `unmount()` method. after each `it` function in this file.
afterEach(() => {
	component.unmount();
});

it('should have a textarea and button', () => {
	expect(component.find('textarea').length).toEqual(1);
	expect(component.find('button').length).toEqual(1);
});

it('should have a textarea that users can type in', () => {
	const textare = component.find('textarea');
	// to simulate a change event we use `simulate()` method provided by Enzyme.
	// `change` is actual name of event as an HTML event not react one.
	// The second argument of `simulate()` method is a fake event object which acts like a `event.target.value or `{target: { value: 'new comment' }}`
	textare.simulate('change', {
		target: { value: 'new comment' },
	});
	// Forcing component to update
	component.update();
	// Making sure that the textarea receives the correct `value` prop.
	expect(component.find('textarea').prop('value')).toEqual('new comment');
});
```

If some tests have got common setup we use `describe()` function and add all of them inside that function without any duplicated logic. With `describe()` function we can limit the scope of `beforeEach()` only for tests inside this function.

```JavaScript
import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'Components/CommentBox';
let component;
beforeEach(() => {
	component = mount(<CommentBox />);
});

//  Doing component cleanup using `unmount()` method. after each `it` function in this file.
afterEach(() => {
	component.unmount();
});

it('should have a textarea and button', () => {
	expect(component.find('textarea').length).toEqual(1);
	expect(component.find('button').length).toEqual(1);
});

// We have common logic for two test. Therefore we will wrapped them wirh `describe` function.
describe('the textarea ', () => {
	beforeEach(() => {
		const textarea = component.find('textarea');
		// to simulate a change event we use `simulate()` method provided by Enzyme.
		// `change` is actual name of event as an HTML event not react one.
		// The second argument of `simulate()` method is a fake event object which acts like a `event.target.value or `{target: { value: 'new comment' }}`
		textarea.simulate('change', {
			target: { value: 'new comment' },
		});
		// Forcing component to update
		component.update();
	});
	it('should have a textarea that users can type in', () => {
		// Making sure that the textarea receives the correct `value` prop.
		expect(component.find('textarea').prop('value')).toEqual('new comment');
	});

	it('should make textarea empty while form is submitting', () => {
		// Find form elevent inside component.
		const form = component.find('form');
		form.simulate('submit');
		// Force component to update and change value of textarea to empty.
		component.update();
		expect(component.find('textarea').prop('value')).toEqual('');
	});
});

```

## Redux and React-Redux Test

To pass tests with redux, we can create a helper function called `root.js` and use it inside all test file and `index.js` file.

```JavaScript
// Root.js
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'reducers';

const store = createStore(reducers);

export default ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
```

Then refactor `index.js`:

```JavaScript
// index.js
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

```

Now we can wrap the `Commentbox` component with `Root` component to let it have `store` inside the `Provider` in its parent hierarchy.

```JavaScript
import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'Components/CommentBox';
import Root from 'Root';
let component;
beforeEach(() => {
	component = mount(
		<Root>
			<CommentBox />
		</Root>
	);
});
...
```

## Reducer Test

To test a reducer, first call a reducer and pass a fake action and then make an expectation on the value which reducer should return.

```JavaScript
import commentReducer from 'reducers/comments';
import * as actionTypes from 'actions/actionTypes';

it('should handle actions of type SAVE_COMMENT', () => {
	const fakeAction = {
		type: actionTypes.SAVE_COMMENT,
		payload: 'new comment',
	};
	const newState = commentReducer([], fakeAction);
	expect(newState).toEqual(['new comment']);
});

it('should handle action with unknown type', () => {
	const newState = commentReducer([], { type: 'UNKNOWN' });
	expect(newState).toEqual([]);
});

```
