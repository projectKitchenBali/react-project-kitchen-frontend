import React from "react";

import { ArticleBanner, ProfileBanner, AppBanner } from "./components";

import styles from "./banner.module.css";

export type TBannerInfo = {
	appName: string;
};

export type TTextBanner = {
	type: "text";
	appName: string;
	onFollow?: never;
	onUnfollow?: never;
	isUser?: never;
	user?: never;
	article?: never;
};

export type TProfileBanner = {
	type: "profile";
	appName?: never;
	onFollow: () => void;
	onUnfollow: () => void;
	isUser: boolean;
	user: TUser;
	article?: never;
};

export type TArticleBanner = {
	type: "article";
	appName?: never;
	onFollow?: never;
	onUnfollow?: never;
	isUser: boolean;
	user?: never;
	article: TArticle;
};

type TBanner = TTextBanner | TProfileBanner | TArticleBanner;

export function Banner({
	appName,
	type = "text",
	isUser,
	user,
	article,
	onFollow,
	onUnfollow,
}: TBanner) {
	let content;
	switch (type) {
		case "article":
			content = <ArticleBanner isUser={isUser!} article={article!} />;
			break;
		case "profile":
			content = (
				<ProfileBanner
					isUser={isUser!}
					user={user!}
					onFollow={onFollow!}
					onUnfollow={onUnfollow!}
				/>
			);
			break;
		case "text":
			content = <AppBanner appName={appName!} />;
			break;
		default:
			content = <AppBanner appName={appName!} />;
			break;
	}
	return (
		<div className={styles["banner_container"]}>
			<nav className={styles["banner"]}>{content}</nav>
		</div>
	);
}
