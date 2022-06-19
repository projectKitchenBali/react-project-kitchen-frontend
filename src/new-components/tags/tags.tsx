import React, { FC, SyntheticEvent } from "react";
import agent from "../../agent";
import TagList from "./tag-list/tag-list";
import Tag from "./tag/tag";
import styles from "./tags.module.css";

const Tags: FC<ITags> = ({ textTitle, tags, onClickTag }) => {
	return (
		<div className={styles.sidebar}>
			{textTitle && <p className="text_type_main-default">{textTitle}</p>}

			{tags ? (
				<TagList>
					{tags.map((tag) => {
						const handleClick = (e: SyntheticEvent) => {
							e.preventDefault();

							onClickTag(
								tag,
								(page: string) => agent.Articles.byTag(tag, page),
								agent.Articles.byTag(tag)
							);
						};

						return (
							<li key={tag}>
								<Tag onClick={handleClick}>{tag}</Tag>
							</li>
						);
					})}
				</TagList>
			) : (
				<div>Loading Tags...</div>
			)}
		</div>
	);
};

export default Tags;
