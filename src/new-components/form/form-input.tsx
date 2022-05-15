import React from "react";
import cl from "./form-input.module.css";

interface FormInputProps {
	value: string;
	label?: string;
	type: "text" | "password" | "email"; // file
	placeholder?: string;

	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	onClick?(e: React.MouseEvent<HTMLAnchorElement>): void;
}

const FormInput: React.FC<FormInputProps> = (props) => {
	return (
		<div className={cl.group}>
			{props.label && <label className={cl.label}>{props.label}</label>}

			<div className={cl.controls}>
				{props.onClick && (
					<a href="#" className={cl.icon} onClick={props.onClick}>
						{props.children}
					</a>
				)}

				<input
					className={cl.control}
					type={props.type}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
				/>
			</div>
		</div>
	);
};

export default FormInput;
