import React, { FunctionComponent } from "react";
import DeleteButton from "../../../components/Article/DeleteButton";
import { Link } from "react-router-dom";
import styles from "./comment-box.module.css";
import AvatarIcon from "../../../assets/icons/avatar-icon";
import { UserMetaWithActions } from "../../user-meta-with-actions/user-meta-with-actions";

type CommentProps = {
	comment: TComment;
	currentUser: TUser;
	slug: string;
};
export const CommentBox: FunctionComponent<CommentProps> = ({
	comment,
	currentUser,
	slug,
}) => {
	const show = currentUser && currentUser.username === comment.author.username;
	return (
		<div className={`card ${styles.card}`}>
			<div className="card-block">
				<p className="card-text">{comment.body}</p>
			</div>
			<div className={`${styles.cardFooter}`}>
				<UserMetaWithActions
					actionsType="commentBox"
					comment={comment}
					slug={slug}
					canDelete={show}
				/>
			</div>
		</div>
	);
};

export default CommentBox;
