import CommentBox from "../comment/comment-box";
import React from "react";

const CommentList = (props) => {
	return (
		<div>
			{props.comments.map((comment) => {
				return (
					<CommentBox
						comment={comment}
						currentUser={props.currentUser}
						slug={props.slug}
						key={comment.id}
					/>
				);
			})}
		</div>
	);
};

export default CommentList;
