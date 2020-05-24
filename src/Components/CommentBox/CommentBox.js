import React, { Component } from 'react';
import { saveComment } from 'actions/actionCreators';
import { connect } from 'react-redux';

class CommentBox extends Component {
	state = {
		comment: '',
	};

	handleChange = (event) => {
		this.setState({ comment: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.saveComment(this.state.comment);
		this.setState({ comment: '' });
	};

	render() {
		const { comment } = this.state;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<h4>Add a Comment</h4>
					<textarea value={comment} onChange={this.handleChange} />
					<div>
						<button>Submit</button>
					</div>
				</form>
			</div>
		);
	}
}

export default connect(null, { saveComment })(CommentBox);
