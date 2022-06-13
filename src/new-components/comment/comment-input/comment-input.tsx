import React, { FC, SyntheticEvent, useState } from "react";
import agent from "../../../agent";
import { ADD_COMMENT } from "../../../constants/actionTypes";
import { connect } from "react-redux";
import styles from "./comment-input.module.css";
import TextArea from "../../text-area/text-area";
import { UserMetaWithActions } from "../../user-meta-with-actions/user-meta-with-actions";

const mapDispatchToProps = (dispatch: any) => ({
	onSubmit: (payload: string) => dispatch({ type: ADD_COMMENT, payload }),
});

const CommentInput: FC<{
	slug: string;
	currentUser: TUser;
	onSubmit: (payload: string) => void;
}> = ({ slug, currentUser, onSubmit }) => {
	const [body, setBody] = useState<string>("");

	const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBody(ev.currentTarget.value);
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
		<form className={`${styles.card}`} onSubmit={createComment}>
			<div className={`${styles.cardBlock}`}>
				<TextArea
					className={`text_type_main-default ${styles.textArea}`}
					placeholder="Написать комментарий"
					value={body}
					onChange={onChange}
					rows={3}
				></TextArea>
			</div>
			<div className={`${styles.cardFooter}`}>
				<UserMetaWithActions
					actionsType="commentInput"
					user={currentUser}
					currentDate={new Date()}
				/>
			</div>
		</form>
	);
};

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
