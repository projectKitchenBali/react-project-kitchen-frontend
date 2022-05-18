import { FunctionComponent } from "react";
import styles from "./comment-box.module.css";

import { UserMetaWithActions } from "../../user-meta-with-actions/user-meta-with-actions";

type CommentProps = {
	comment: TComment;
	currentUser?: TUser;
	slug: string;
};
const CommentBox: FunctionComponent<CommentProps> = ({
	comment,
	currentUser,
	slug,
}) => {
	const show = currentUser
		? currentUser.username === comment.author.username
		: false;
	return (
		<div className={`${styles.card}`}>
			<div className={styles.cardBlock}>
				<p className="text_type_main-default">{comment.body}</p>
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
