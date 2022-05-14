import { FunctionComponent } from "react";
import CommentBox from "../comment-box/comment-box";
import { IComment, IUser } from "../comment-types";

type CommentListProps = {
	comments: IComment[];
	currentUser: IUser;
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
