import React, { FC, SyntheticEvent, useState } from "react";
import agent from "../../agent";
import { ADD_COMMENT } from "../../constants/actionTypes";
import { IUser } from "../comment-types";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: any) => ({
	onSubmit: (payload: string) => dispatch({ type: ADD_COMMENT, payload }),
});

const CommentInput: FC<{
	slug: string;
	currentUser: IUser;
	onSubmit: (payload: string) => any;
}> = ({ slug, currentUser, onSubmit }) => {
	const [body, setBody] = useState<string>("");

	const onChange = (ev: SyntheticEvent<HTMLTextAreaElement>) => {
		const target = ev?.target as HTMLTextAreaElement;
		setBody(target.value);
	};

	const createComment = (ev: React.SyntheticEvent) => {
		ev.preventDefault();
		const payload = agent.Comments.create(slug, {
			body: body,
		});
		setBody("");
		onSubmit(payload);
	};

	return (
		<form className="card comment-form" onSubmit={createComment}>
			<div className="card-block">
				<textarea
					className="form-control"
					placeholder="Write a comment..."
					value={body}
					onChange={onChange}
					rows={3}
				></textarea>
			</div>
			<div className="card-footer">
				<img
					src={currentUser.image}
					className="comment-author-img"
					alt={currentUser.username}
				/>
				<button className="btn btn-sm btn-primary" type="submit">
					Post Comment
				</button>
			</div>
		</form>
	);
};

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
