import styles from "./SubmitButton.module.css";
import React from "react";

export default function ReadMore({ children, onClick, disabled, htmlType }) {
	const className = disabled ? styles.main__disabled : styles.main;
	return (
		<button
			className={className}
			disabled={disabled}
			onClick={onClick}
			htmlType={htmlType}
		>
			{children}
		</button>
	);
}
