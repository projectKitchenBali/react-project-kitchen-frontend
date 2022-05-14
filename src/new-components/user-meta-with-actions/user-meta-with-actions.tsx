import React from "react";

import { Link } from "react-router-dom";
import ArticleActions from "../article/article-actions";
import { AvatarIcon } from "../../assets/icons";

import styles from "./user-meta-with-actions.module.css";

type TOptions = {
	weekday: "short";
	year: "numeric";
	month: "long";
	day: "numeric";
};
const options: TOptions = {
	weekday: "short",
	year: "numeric",
	month: "long",
	day: "numeric",
};

export type TArticleActions = {
	actionsType: "article";
	canModify: boolean;
	article: TArticle;
};

type TUserMetaWithActions = TArticleActions;

export const UserMetaWithActions: React.FC<TUserMetaWithActions> = (props) => {
	let articleActions;
	switch (props.actionsType) {
		case "article":
			articleActions = (
				<ArticleActions canModify={props.canModify} article={props.article} />
			);
			break;
		default:
			articleActions = null;
			break;
	}

	return (
		<div className={`${styles["user-meta"]} text_type_main-default`}>
			<Link
				className={styles["avatar"]}
				to={`/@${props.article.author.username}`}
			>
				<AvatarIcon width={40} height={40} />
			</Link>

			<div className={styles["info"]}>
				<Link
					className={styles["author"]}
					to={`/@${props.article.author.username}`}
				>
					{props.article.author.username}
				</Link>
				<span className={`${styles["date"]} text_type_main-caption`}>
					{new Date(props.article.createdAt)
						.toLocaleDateString("ru-RU", options)
						.replace(/\s*г\./, "")}
				</span>
			</div>
			<div className={styles["actions"]}>{articleActions}</div>
		</div>
	);
};
