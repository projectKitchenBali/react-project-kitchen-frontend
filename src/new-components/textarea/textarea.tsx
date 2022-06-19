import React, { ChangeEvent } from "react";
import cl from "./textarea.module.css";

interface TextareaProps {
	value: string;
	label?: string;
	placeholder?: string;
	rows?: number;

	onChange(e: ChangeEvent<HTMLTextAreaElement>): void;
}

const Textarea: React.FC<TextareaProps> = (props) => {
	return (
		<div className={cl.group}>
			{props.label && <label className={cl.label}>{props.label}</label>}
			<div>
				<textarea
					className={cl.control}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
					rows={props.rows || 8}
				/>
			</div>
		</div>
	);
};

export default Textarea;
