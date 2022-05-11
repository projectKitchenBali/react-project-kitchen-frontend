import React from "react";

import { TBannerInfo } from "../banner";

import styles from "../banner.module.css";

export const AppBanner: React.FC<TBannerInfo> = ({ appName }) => {
	return (
		<div className={styles["banner_text"]}>
			<h1 className={`${styles["banner_shadow"]} text text_type_main-h1`}>
				{appName}
			</h1>
			<h3 className={`${styles["banner_shadow"]} text text_type_main-headline`}>
				Место, где готовится новый опыт
			</h3>
		</div>
	);
};
