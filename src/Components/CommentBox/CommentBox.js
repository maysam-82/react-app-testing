import React, { useState } from 'react';
import { saveComment } from 'actions/actionCreators';
import { connect } from 'react-redux';

const CommentBox = (props) => {
	const [comment, setComment] = useState('');

	const handleChange = (event) => {
		setComment(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.saveComment(comment);
		setComment('');
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h4>Add a Comment</h4>
				<textarea value={comment} onChange={handleChange} />
				<div>
					<button>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default connect(null, { saveComment })(CommentBox);
