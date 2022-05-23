import { FunctionComponent } from "react";
import CommentBox from "../comment-box/comment-box";

interface ICommentListProps {
	comments: TComment[];
	currentUser?: TUser;
	slug: string;
}

const CommentList: FunctionComponent<ICommentListProps> = ({
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
