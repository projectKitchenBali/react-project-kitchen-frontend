import styles from "./ButtonWithIcon.module.css";
import edit from "../../images/edit-icon.svg";
import follow from "../../images/follow-icon.svg";
import unfollow from "../../images/unfollow-icon.svg";
import React from "react";

export default function ButtonWithIcon({
	children,
	onClick,
	disabled,
	htmlType,
	iconType,
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
		default: {
			icon = "";
		}
	}
	const className = disabled ? styles.main__disabled : styles.main;
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
