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

type TUserMeta = {
	username: string;
	createdAt: Date;
};

type TArticleActions = {
	actionsType: "article";
	canModify: boolean;
	article: TArticle;
};

type TUserMetaWithActions = TArticleActions;

const UserMeta: React.FC<TUserMeta> = ({ username, createdAt }) => {
	return (
		<>
			<Link className={styles["avatar"]} to={`/@${username}`}>
				<AvatarIcon width={40} height={40} />
			</Link>

			<div className={styles["info"]}>
				<Link className={styles["author"]} to={`/@${username}`}>
					{username}
				</Link>
				<span className={`${styles["date"]} text_type_main-caption`}>
					{new Date(createdAt)
						.toLocaleDateString("ru-RU", options)
						.replace(/\s*г\./, "")}
				</span>
			</div>
		</>
	);
};

export const UserMetaWithActions: React.FC<TUserMetaWithActions> = (props) => {
	let content;
	switch (props.actionsType) {
		case "article":
			content = (
				<>
					<UserMeta
						username={props.article.author.username}
						createdAt={props.article.createdAt}
					/>
					<div className={styles["actions"]}>
						<ArticleActions
							canModify={props.canModify}
							article={props.article}
						/>
					</div>
				</>
			);
			break;
	}

	return (
		<div className={`${styles["user-meta"]} text_type_main-default`}>
			{content}
		</div>
	);
};
