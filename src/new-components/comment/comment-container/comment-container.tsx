import CommentInput from "../comment-input/comment-input";
import CommentList from "../comment-list/comment-list";
import { Link } from "react-router-dom";
import React, { FC } from "react";
import ListErrors from "../../../components/ListErrors";

type CommentListProps = {
	comments: TComment[];
	currentUser: TUser;
	slug: string;
	errors: Array<string>;
};

const CommentContainer: FC<CommentListProps> = ({
	currentUser,
	comments,
	slug,
	errors,
}) => {
	if (currentUser) {
		console.log(currentUser);
		return (
			<div className="col-xs-12 col-md-8 offset-md-2">
				<div>
					<ListErrors errors={errors}></ListErrors>
					<CommentInput slug={slug} currentUser={currentUser} />
				</div>

				<CommentList
					comments={comments}
					slug={slug}
					currentUser={currentUser}
				/>
			</div>
		);
	} else {
		return (
			<div className="col-xs-12 col-md-8 offset-md-2">
				<p>
					<Link to="/login">Sign in</Link>
					&nbsp;or&nbsp;
					<Link to="/register">sign up</Link>
					&nbsp;to add comments on this article.
				</p>

				<CommentList
					comments={comments}
					slug={slug}
					currentUser={currentUser}
				/>
			</div>
		);
	}
};

export default CommentContainer;
