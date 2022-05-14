import React from "react";
import { Link } from "react-router-dom";

import Button from "../../button/button";
import { TProfileBanner } from "../banner";

import styles from "../banner.module.css";

function EditUserProfile({ isUser }: { isUser: boolean }) {
	if (!isUser) {
		return null;
	}
	return (
		<Link to={"/settings"}>
			<Button type="button" iconType="edit">
				Редактировать профиль
			</Button>
		</Link>
	);
}

function FollowUserButton({
	isUser,
	user,
	onFollow,
	onUnfollow,
}: {
	isUser: boolean;
	user: TUser;
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

export const ProfileBanner: React.FC<Omit<TProfileBanner, "type">> = ({
	isUser,
	user,
	profile,
	onFollow,
	onUnfollow,
}) => {
	return (
		<div className={styles["banner_profile"]}>
			<div className={styles["banner_profile_inner"]}>
				<img
					className={styles["banner_profile_image"]}
					src={profile.image}
					alt={user.image}
				/>
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
};
