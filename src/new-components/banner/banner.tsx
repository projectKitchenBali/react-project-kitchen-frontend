import React from "react";

import styles from "./banner.module.css";

type TArticle = {
	slug: string;
	title: string;
	description: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
	tagList: string[];
	favorited: boolean;
	favoritesCount: number;
};

type TProfile = {
	username: string;
	image: string;
	following: boolean;
};

type TBannerInfo = {
	appName: string;
	token: string;
};

type TTextBanner = {
	type?: "text";
	onFollow?: never;
	onUnfollow?: never;
	onEditArticle?: never;
	onRemoveArticle?: never;
	profile?: never;
	article?: never;
};

type TProfileBanner = {
	type?: "profile";
	onFollow?: () => void;
	onUnfollow?: () => void;
	onEditArticle?: never;
	onRemoveArticle?: never;
	profile?: TProfile;
	article?: never;
};

type TArticleBanner = {
	type?: "article";
	onFollow?: never;
	onUnfollow?: never;
	onEditArticle?: () => void;
	onRemoveArticle?: () => void;
	profile?: never;
	article?: TArticle;
};

type TBanner = TBannerInfo & (TTextBanner | TProfileBanner | TArticleBanner);

function ProfileBanner({ onFollow, onUnfollow }: TProfileBanner) {
	return (
		<div className={styles["banner_text"]}>
			<h1 className={`${styles["banner_shadow"]} text text_type_main-h1`}>
				Проектная кухня
			</h1>
			<h3 className={`${styles["banner_shadow"]} text text_type_main-headline`}>
				Место, где готовится новый опыт
			</h3>
		</div>
	);
}

function TextBanner() {
	return (
		<div className={styles["banner_text"]}>
			<h1 className={`${styles["banner_shadow"]} text text_type_main-h1`}>
				Проектная кухня
			</h1>
			<h3 className={`${styles["banner_shadow"]} text text_type_main-headline`}>
				Место, где готовится новый опыт
			</h3>
		</div>
	);
}

export function Banner({
	type = "text",
	onFollow,
	onUnfollow,
	onEditArticle,
	onRemoveArticle,
}: TBanner) {
	let content;
	switch (type) {
		case "profile":
			content = <ProfileBanner onFollow={onFollow} />;
			break;
		default:
			content = <TextBanner />;
			break;
	}
	return (
		<div className={styles["banner_container"]}>
			<nav className={styles["banner"]}>{content}</nav>
		</div>
	);
}
