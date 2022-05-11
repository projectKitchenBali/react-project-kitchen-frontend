import React from "react";

import { Link } from "react-router-dom";
import ArticleActions from "./article-actions";
import { AvatarIcon } from "../../assets/icons";

import styles from "./article.module.css";

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

export function ArticleMeta({
	article,
	canModify,
}: {
	article: TArticle;
	canModify: boolean;
}) {
	return (
		<div className={`${styles["article-meta"]} text_type_main-default`}>
			<Link className={styles["avatar"]} to={`/@${article.author.username}`}>
				<AvatarIcon width={40} height={40} />
			</Link>

			<div className={styles["info"]}>
				<Link className={styles["author"]} to={`/@${article.author.username}`}>
					{article.author.username}
				</Link>
				<span className={`${styles["date"]} text_type_main-caption`}>
					{new Date(article.createdAt)
						.toLocaleDateString("ru-RU", options)
						.replace(/\s*г\./, "")}
				</span>
			</div>
			<div className={styles["actions"]}>
				<ArticleActions canModify={canModify} article={article} />
			</div>
		</div>
	);
}
