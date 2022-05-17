import React from "react";

import { ArticleBanner, ProfileBanner, AppBanner } from "./components";

import styles from "./banner.module.css";

export type TBannerInfo = {
	appName: string;
};

export type TTextBanner = {
	type: "text";
	appName: string;
};

export type TProfileBanner = {
	type: "profile";
	onFollow: (username: string) => void;
	onUnfollow: (username: string) => void;
	isUser: boolean;
	user: TUser;
};

export type TArticleBanner = {
	type: "article";
	canModify: boolean;
	article: TArticle;
};

type TBanner = TTextBanner | TProfileBanner | TArticleBanner;

export const Banner: React.FC<TBanner> = (props) => {
	let content;
	switch (props.type) {
		case "article":
			content = (
				<ArticleBanner canModify={props.canModify} article={props.article} />
			);
			break;
		case "profile":
			content = (
				<ProfileBanner
					isUser={props.isUser}
					user={props.user}
					onFollow={props.onFollow}
					onUnfollow={props.onUnfollow}
				/>
			);
			break;
		case "text":
			content = <AppBanner appName={props.appName} />;
			break;
	}
	return (
		<div className={styles["banner_container"]}>
			<nav className={styles["banner"]}>{content}</nav>
		</div>
	);
};
