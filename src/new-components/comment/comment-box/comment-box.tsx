import React, { FunctionComponent } from "react";
import DeleteButton from "../../../components/Article/DeleteButton";
import { Link } from "react-router-dom";
import { IComment, IUser } from "../comment-types";
import styles from "./comment-box.module.css";
import AvatarIcon from "../../../assets/icons/avatar-icon";

type CommentProps = {
	comment: IComment;
	currentUser: IUser;
	slug: string;
};
export const CommentBox: FunctionComponent<CommentProps> = ({
	comment,
	currentUser,
	slug,
}) => {
	const show = currentUser && currentUser.username === comment.author.username;
	console.log(comment.author);
	return (
		<div className={`card ${styles.card}`}>
			<div className="card-block">
				<p className="card-text">{comment.body}</p>
			</div>
			<div className={`${styles.cardFooter}`}>
				<Link to={`/@${comment.author.username}`} className="comment-author">
					<AvatarIcon width={48} height={48} />
				</Link>
				<Link
					to={`/@${comment.author.username}`}
					className="text text_type_main-headline"
				>
					{comment.author.username}
				</Link>
				<span className="date-posted">
					{new Date(comment.createdAt).toDateString()}
				</span>
				<DeleteButton show={show} slug={slug} commentId={comment.id} />
			</div>
		</div>
	);
};

export default CommentBox;
