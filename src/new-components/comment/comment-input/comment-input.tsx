import React, { FC, SyntheticEvent, useState } from "react";
import agent from "../../../agent";
import { ADD_COMMENT } from "../../../constants/actionTypes";
import { connect } from "react-redux";
import styles from "./comment-input.module.css";
import TextArea from "../text-area/text-area";
const mapDispatchToProps = (dispatch: any) => ({
	onSubmit: (payload: string) => dispatch({ type: ADD_COMMENT, payload }),
});

const CommentInput: FC<{
	slug: string;
	currentUser: TUser;
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
		<form className={`${styles.card}`} onSubmit={createComment}>
			<div className={`${styles.cardBlock}`}>
				<TextArea
					className={styles.textArea}
					placeholder="Комменты сюда..."
					value={body}
					onChange={onChange}
					rows={3}
				></TextArea>
			</div>
			<div className={`${styles.cardFooter}`}>
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
