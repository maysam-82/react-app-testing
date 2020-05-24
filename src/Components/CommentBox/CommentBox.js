import React, { useState } from 'react';
import { saveComment, fetchComments } from 'actions/actionCreators';
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

	const handleFetchComments = () => {
		props.fetchComments();
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
			<div>
				<button onClick={handleFetchComments} className="btn-fetch-comments">
					Fetch Comments
				</button>
			</div>
		</div>
	);
};

export default connect(null, { saveComment, fetchComments })(CommentBox);
