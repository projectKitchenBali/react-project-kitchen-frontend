import React from "react";

import { ArticleMeta } from "../../article/article-meta";
import { TArticleBanner } from "../banner";

import styles from "../banner.module.css";

export const ArticleBanner: React.FC<Omit<TArticleBanner, "type">> = ({
	isUser,
	article,
}) => {
	return (
		<div className={`${styles["banner_article"]}`}>
			<div className={styles["banner_article_inner"]}>
				<ArticleMeta canModify={isUser} article={article} />
			</div>
		</div>
	);
};
