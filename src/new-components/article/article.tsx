import CommentContainer from "../comment/comment-container/comment-container";
import React, { Dispatch, useEffect } from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import { marked } from "marked";
import { AnyAction } from "redux";
import {
	ARTICLE_PAGE_LOADED,
	ARTICLE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import { Banner } from "../banner/banner";

import styles from "./article.module.css";

interface IState {
	article: TArticle;
	articleList: TArticleList;
	common: {
		appName: string;
		token: string;
		viewChangeCounter: number;
		appLoaded: boolean;
		currentUser: TUser;
	};
	router: { location: Location; action: string };
	settings: { inProgress: boolean };
}

const mapStateToProps = (state: IState) => ({
	...state.article,
	currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	onLoad: (payload: Promise<[TArticle, TComment[]]>) =>
		dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
	onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});

interface IArticle {
	onLoad: (payload: Promise<[TArticle, TComment[]]>) => void;
	onUnload: () => void;
	article: TArticle;
	articleList: TArticleList;
	currentUser: TUser;
	comments: TComment[];
	commentErrors: string[];
	location: {
		pathname: string;
	};
	match: {
		params: {
			id: string;
		};
	};
}

const Article: React.FC<IArticle> = ({ ...props }) => {
	useEffect(() => {
		props.onLoad(
			Promise.all([
				agent.Articles.get(props.match.params.id),
				agent.Comments.forArticle(props.match.params.id),
			])
		);
		return () => {
			props.onUnload();
		};
	}, []);

	if (!props.article) {
		return <></>;
	}

	const markup = {
		__html: marked.parse(props.article.body, { sanitize: true }),
	};

	const canModify =
		props.currentUser &&
		props.currentUser.username === props.article.author.username;

	return (
		<>
			<Banner type="article" article={props.article} canModify={canModify} />

			<div className={styles["article"]}>
				<h1 className={`${styles["title"]} text_type_main-h2`}>
					{props.article.title}
				</h1>
				<div
					className={`${styles["body"]} text text_type_main-default`}
					dangerouslySetInnerHTML={markup}
				></div>

				<ul className={`${styles["tags-list"]} text_type_main-caption`}>
					{props.article.tagList.map((tag) => {
						return (
							<li className={styles["tags-default"]} key={tag}>
								{tag}
							</li>
						);
					})}
				</ul>

				<CommentContainer
					comments={props.comments || []}
					errors={props.commentErrors}
					slug={props.match.params.id}
					currentUser={props.currentUser}
				/>
			</div>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
export { Article, mapStateToProps };
