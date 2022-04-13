import React from "react";
import styles from "./ReadMore.module.css";

export default function ReadMore({ children, onClick, disabled, htmlType }) {
	const className = disabled ? styles.main__disabled : styles.main;
	return (
		<div
			className={className}
			disabled={disabled}
			onClick={onClick}
			htmlType={htmlType}
		>
			{children ? children : "Read more"}
		</div>
	);
}
