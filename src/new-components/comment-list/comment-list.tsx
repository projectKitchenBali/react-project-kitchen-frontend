import { FunctionComponent } from "react";
import CommentBox from "../comment/comment-box";
import { Comment, User } from "../../types";

type CommentListProps = {
	comments: Comment[];
	currentUser: User;
	slug: string;
};

const CommentList: FunctionComponent<CommentListProps> = ({
	comments,
	currentUser,
	slug,
}) => {
	return (
		<div>
			{comments.map((comment) => {
				return (
					<CommentBox
						comment={comment}
						currentUser={currentUser}
						slug={slug}
						key={comment.id}
					/>
				);
			})}
		</div>
	);
};

export default CommentList;
