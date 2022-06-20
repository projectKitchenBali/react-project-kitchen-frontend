import React, { FC } from "react";
import styles from "./tag-list.module.css";

const TagList: FC<ITagList> = ({ children, width }) => {
	return (
		<ul className={styles["tag-list"]} style={{ width }}>
			{children}
		</ul>
	);
};

export default TagList;
