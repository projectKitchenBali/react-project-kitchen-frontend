import React, {
	FC,
	useState,
	useEffect,
	useRef,
	TextareaHTMLAttributes,
} from "react";
import styles from "./text-area.module.css";

const TextArea: FC<
	TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }
> = (props) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [text, setText] = useState("");
	const [textAreaHeight, setTextAreaHeight] = useState("auto");
	const [parentHeight, setParentHeight] = useState("auto");

	useEffect(() => {
		if (props.value === "") {
			setTextAreaHeight("auto");
			setParentHeight("auto");
		} else {
			textAreaRef.current &&
				setParentHeight(`${textAreaRef.current.scrollHeight + 2}px`);
			setTextAreaHeight("auto");
			textAreaRef.current &&
				setTextAreaHeight(`${textAreaRef.current.scrollHeight + 2}px`);
		}
	}, [text, props.value]);

	const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextAreaHeight("auto");
		textAreaRef.current &&
			setParentHeight(`${textAreaRef.current.scrollHeight + 2}px`);
		setText(event.target.value);

		if (props.onChange) {
			props.onChange(event);
		}
	};

	return (
		<div
			style={{
				minHeight: parentHeight,
			}}
		>
			{props.label && <label className={styles.label}>{props.label}</label>}
			<textarea
				{...props}
				ref={textAreaRef}
				rows={props.rows}
				style={{
					height: textAreaHeight,
				}}
				onChange={onChangeHandler}
			/>
		</div>
	);
};

export default TextArea;
