import React from 'react';
import { connect } from 'react-redux';

const CommentList = (props) => {
	const renderComments = () => {
		return props.comments.map((comment, index) => {
			return <li key={`${index}-${comment}`}>{comment}</li>;
		});
	};
	return (
		<div>
			<ul>{renderComments()}</ul>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		comments: state.comments,
	};
};

export default connect(mapStateToProps)(CommentList);
