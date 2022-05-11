import { Link } from "react-router-dom";
import React from "react";
import agent from "../../agent";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { DELETE_ARTICLE } from "../../constants/actionTypes";
import Button from "../../new-components/button/button";

const mapDispatchToProps = (dispatch: Dispatch<typeof DELETE_ARTICLE>) => ({
	onClickDelete: (slug: string) =>
		dispatch({ type: DELETE_ARTICLE, payload: agent.Articles.del(slug) }),
});

interface IArticleMetaProps {
	article: TArticle;
	canModify: boolean;
	onClickDelete: (slug: string) => {
		type: string;
		payload: string;
	};
}

const ArticleActions: React.FC<IArticleMetaProps> = ({
	canModify,
	article,
	onClickDelete,
}) => {
	let content = null;
	const del = () => {
		onClickDelete(agent.Articles.del(article.slug));
	};

	if (canModify) {
		content = (
			<>
				<Link to={`/editor/${article.slug}`}>
					<Button type="button" iconType="edit">
						Редактировать запись
					</Button>
				</Link>
				<Button type="button" iconType="trash" onClick={del}>
					Удалить запись
				</Button>
			</>
		);
	}

	return <>{content}</>;
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
