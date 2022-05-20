import React from "react";
import styles from "./input.module.css";

interface FormInputProps {
	name?: string;
	value: string;
	label?: string;
	type: "text" | "password" | "email"; // file
	placeholder?: string;
	error?: boolean;

	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	onIconClick?(e: React.MouseEvent<HTMLAnchorElement>): void;
	onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
}

const Input: React.FC<FormInputProps> = ({
	name,
	value,
	label,
	type,
	placeholder,
	onChange,
	onIconClick,
	onBlur,
	error,
	children,
}) => {
	return (
		<div className={styles.group}>
			{label && <label className={styles.label}>{label}</label>}

			<div className={styles.controls}>
				{onIconClick && (
					<a href="#" className={styles.icon} onClick={onIconClick}>
						{children}
					</a>
				)}

				<input
					className={`${styles.control} ${error ? styles.control__error : ""}`}
					name={name}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
				/>
			</div>
		</div>
	);
};

export default Input;
