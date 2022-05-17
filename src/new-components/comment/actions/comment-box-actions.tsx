import { Link } from "react-router-dom";
import React from "react";
import agent from "../../../agent";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { DELETE_COMMENT } from "../../../constants/actionTypes";
import Button from "../../../new-components/button/button";

const mapDispatchToProps = (dispatch: Dispatch<typeof DELETE_COMMENT>) => ({
	onClickDelete: (
		payload: (slug: string, commentId: string) => void,
		commentId: string
	) => dispatch({ type: DELETE_COMMENT, payload, commentId }),
});

interface ICommentMetaProps {
	comment: TComment;
	slug: string;
	canModify: boolean;
	onClickDelete: (
		payload: (slug: string, commentId: string) => void,
		commentId: string
	) => void;
}

const CommentBoxActions: React.FC<ICommentMetaProps> = ({
	canModify,
	comment,
	onClickDelete,
	slug,
}) => {
	const del = () => {
		const payload = agent.Comments.delete(slug, comment.id);
		onClickDelete(payload, comment.id);
	};

	if (canModify) {
		return (
			<>
				<Button type="button" iconType="trash" onClick={del} />
			</>
		);
	}

	return null;
};

export default connect(() => ({}), mapDispatchToProps)(CommentBoxActions);
