import { ReactChild } from "react";

import EditIcon from "../../assets/icons/edit-icon";
import FollowIcon from "../../assets/icons/follow-icon";
import UnfollowIcon from "../../assets/icons/unfollow-icon";
import TrashIcon from "../../assets/icons/trash-icon";

import styles from "./button.module.css";

interface IButton {
	children?: ReactChild;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset" | undefined;
	iconType?: string;
}

export default function Button({
	children,
	onClick,
	disabled = false,
	type,
	iconType = "",
}: IButton) {
	let icon: JSX.Element;
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
			icon = <></>;
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

	if (type === undefined) {
		return (
			<button
				className={`${readMoreClassName} text_type_main-default`}
				disabled={disabled}
				onClick={onClick}
				type={type}
			>
				{children}
			</button>
		);
	}
	return (
		<button
			className={`${className} text_type_main-default`}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{iconType && <div className={styles.icon}>{icon}</div>}
			{children}
		</button>
	);
}
