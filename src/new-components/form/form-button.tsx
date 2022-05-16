import React from "react";
import cl from "./form-button.module.css";

interface FormButtonProps {
	disabled?: boolean;
	onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
	className?: string;
}

const FormButton: React.FC<FormButtonProps> = ({
	className,
	onClick,
	disabled = false,
	children,
}) => {
	return (
		<button
			className={`${cl.button} ${className}`}
			type="submit"
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default FormButton;
