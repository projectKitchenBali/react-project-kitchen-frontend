import React, { FC } from "react";
import styles from "./tag.module.css";

const Tag: FC<ITag> = ({ children, onClick }) => {
	return (
		<span className={`${styles.tag} text_type_main-caption`} onClick={onClick}>
			{children}
		</span>
	);
};

export default Tag;
