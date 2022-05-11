import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "../button/button";
import { AvatarIcon } from "../../assets/icons";

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
};

type TTextBanner = {
	type: "text";
	appName: string;
	onFollow?: never;
	onUnfollow?: never;
	onEditArticle?: never;
	onRemoveArticle?: never;
	isUser?: never;
	user?: never;
	article?: never;
};

type TProfileBanner = {
	type: "profile";
	appName?: never;
	onFollow: () => void;
	onUnfollow: () => void;
	onEditArticle?: never;
	onRemoveArticle?: never;
	isUser: boolean;
	user: TProfile;
	article?: never;
};

type TArticleBanner = {
	type: "article";
	appName?: never;
	onFollow?: never;
	onUnfollow?: never;
	onEditArticle: () => void;
	onRemoveArticle: () => void;
	isUser: boolean;
	user?: never;
	article: TArticle;
};

type TBanner = TTextBanner | TProfileBanner | TArticleBanner;

function EditUserProfile({ isUser }: { isUser: boolean }) {
	const [redirect, setRedirect] = useState(false);
	if (!isUser) {
		return null;
	}

	return (
		<>
			<Button
				type="button"
				onClick={() => {
					setRedirect(true);
				}}
				iconType="edit"
			>
				Редактировать профиль
			</Button>
			{redirect && <Redirect to="/settings" push={true} />}
		</>
	);
}

function FollowUserButton({
	isUser,
	user,
	onFollow,
	onUnfollow,
}: {
	isUser: boolean;
	user: TProfile;
	onFollow: (username: string) => void;
	onUnfollow: (username: string) => void;
}) {
	const handleClick = () => {
		if (user?.following) {
			onUnfollow(user.username);
		} else {
			onFollow(user.username);
		}
	};

	if (isUser) {
		return null;
	}

	return (
		<Button
			type="button"
			onClick={handleClick}
			iconType={user.following ? "unfollow" : "follow"}
		>
			{user.following ? "Unfollow" : "Follow"}
		</Button>
	);
}

function ProfileBanner({
	isUser,
	user,
	onFollow,
	onUnfollow,
}: Omit<TProfileBanner, "type">) {
	return (
		<div className={styles["banner_profile"]}>
			<div className={styles["banner_profile_inner"]}>
				<AvatarIcon width={120} height={120} />
				<h3
					className={`${styles["banner_profile__username"]} text text_type_main-headline`}
				>
					{user.username}
				</h3>

				<div className=""></div>
				<div className={styles["banner_profile_buttons"]}>
					<EditUserProfile isUser={isUser} />
					<FollowUserButton
						isUser={isUser}
						user={user}
						onFollow={onFollow}
						onUnfollow={onUnfollow}
					/>
				</div>
			</div>
		</div>
	);
}

function TextBanner({ appName }: TBannerInfo) {
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
}

export function Banner({
	appName,
	type = "text",
	isUser,
	user,
	article,
	onFollow,
	onUnfollow,
	onEditArticle,
	onRemoveArticle,
}: TBanner) {
	let content;
	switch (type) {
		case "article":
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
			content = <TextBanner appName={appName!} />;
			break;
		default:
			content = <TextBanner appName={appName!} />;
			break;
	}
	return (
		<div className={styles["banner_container"]}>
			<nav className={styles["banner"]}>{content}</nav>
		</div>
	);
}
