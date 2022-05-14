import React from "react";

import { UserMetaWithActions } from "../../user-meta-with-actions/user-meta-with-actions";
import { TArticleBanner } from "../banner";

import styles from "../banner.module.css";

export const ArticleBanner: React.FC<Omit<TArticleBanner, "type">> = ({
	canModify,
	article,
}) => {
	return (
		<div className={`${styles["banner_article"]}`}>
			<div className={styles["banner_article_inner"]}>
				<UserMetaWithActions
					actionsType="article"
					canModify={canModify}
					article={article}
				/>
			</div>
		</div>
	);
};
