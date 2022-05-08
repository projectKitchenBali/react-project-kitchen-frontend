import styles from "./Button.module.css";
import EditIcon from "../../assets/icons/edit-icon";
import FollowIcon from "../../assets/icons/follow-icon";
import UnfollowIcon from "../../assets/icons/unfollow-icon";
import TrashIcon from "../../assets/icons/trash-icon";
import React from "react";

export default function ButtonWithIcon({
	children,
	onClick,
	disabled = false,
	type,
	iconType = "",
}) {
	let icon = "";
	switch (iconType) {
		case "edit": {
			icon = <EditIcon />;
			break;
		}
		case "follow": {
			icon = <FollowIcon />;
			break;
		}
		case "unfollow": {
			icon = <UnfollowIcon />;
			break;
		}
		case "trash": {
			icon = <TrashIcon type="error" />;
			break;
		}
		default: {
			icon = "";
		}
	}
	const className = disabled
		? styles.main__disabled
		: iconType === "trash"
		? styles.red
		: styles.main;

	const readMoreClassName = disabled
		? styles.read_more__disabled
		: styles.read_more;

	if (type === "read-more") {
		return (
			<div
				className={readMoreClassName}
				disabled={disabled}
				onClick={onClick}
				type={type}
			>
				{children ? children : "Read more"}
			</div>
		);
	}
	return (
		<button
			className={className}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{iconType && <div className={styles.icon}>{icon}</div>}
			{children}
		</button>
	);
}
