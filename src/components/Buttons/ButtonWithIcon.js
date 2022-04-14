import styles from "./ButtonWithIcon.module.css";
import edit from "../../images/edit-icon.svg";
import follow from "../../images/follow-icon.svg";
import unfollow from "../../images/unfollow-icon.svg";
import trash from "../../images/trash-icon.svg";
import React from "react";

export default function ButtonWithIcon({
	children,
	onClick,
	disabled,
	htmlType,
	iconType,
	color,
}) {
	let icon = "";
	switch (iconType) {
		case "edit": {
			icon = edit;
			break;
		}
		case "follow": {
			icon = follow;
			break;
		}
		case "unfollow": {
			icon = unfollow;
			break;
		}
		case "trash": {
			icon = trash;
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
	return (
		<button
			className={className}
			disabled={disabled}
			onClick={onClick}
			htmlType={htmlType}
		>
			{icon && <img src={icon} />}
			{children}
		</button>
	);
}
