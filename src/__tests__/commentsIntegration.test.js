import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'Components/App/App';

beforeEach(() => {
	// before button click simulates, any request by axios is turned off.
	moxios.install();
	// If request is going to be started, moxios will intercept that request and go to json api and automatically respond to it.
	moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
		status: 200,
		response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }],
	});
});

afterEach(() => {
	// To make sure that we do not use this request in some other location inside of test
	moxios.uninstall();
});

// using `done` as argument of callback function we tell jest to wait for a moment for this `setTimeout` to complete before it considers the whole test to be done. Jest will run the test but it will not consider the test is finished until we invoke this function.
it('should fetch a list of comments and display them', (done) => {
	// Try to render the entire App
	const component = mount(
		<Root>
			<App />
		</Root>
	);

	// Find the `fetchComments` button by the use of `className` and click it.
	component.find('.btn-fetch-comments').simulate('click');

	//with `moxios.wait()` it holds on the arrow function and as soon as getting response, it will execute that function.
	moxios.wait(() => {
		component.update();
		// Expect to find a list of comments! 500 li's
		expect(component.find('li').length).toEqual(2);

		// done. nothing is inside this test.
		done();
		component.unmount();
	});
});
