import React from "react";

import { Link } from "react-router-dom";
import { AvatarIcon } from "../../assets/icons";
import ArticleActions from "../article/article-actions";
import CommentBoxActions from "../comment/actions/comment-box-actions";
import CommentInputActions from "../comment/actions/comment-input-actions";

import styles from "./user-meta-with-actions.module.css";

type TOptions = {
	weekday: "short";
	year: "numeric";
	month: "long";
	day: "numeric";
};
const options: TOptions = {
	weekday: "short",
	year: "numeric",
	month: "long",
	day: "numeric",
};

type TUserMeta = {
	username: string;
	createdAt?: Date;
	imageUrl: string;
};

type TArticleActions = {
	actionsType: "article";
	canModify: boolean;
	article: TArticle;
};

type TCommentBoxActions = {
	actionsType: "commentBox";
	canDelete: boolean;
	slug: string;
	comment: TComment;
};
type TCommentInputActions = {
	actionsType: "commentInput";
	user: TUser;
};

type TUserMetaWithActions =
	| TArticleActions
	| TCommentBoxActions
	| TCommentInputActions;

const UserMeta: React.FC<TUserMeta> = ({ username, createdAt, imageUrl }) => {
	return (
		<>
			{imageUrl ? (
				<Link className={styles["avatar"]} to={`/@${username}`}>
					<img
						className={styles["avatar_image"]}
						src={imageUrl}
						alt={username}
					/>
				</Link>
			) : (
				<AvatarIcon />
			)}

			<div className={styles["info"]}>
				<Link className={styles["author"]} to={`/@${username}`}>
					{username}
				</Link>
				{createdAt && (
					<span className={`${styles["date"]} text_type_main-caption`}>
						{new Date(createdAt)
							.toLocaleDateString("ru-RU", options)
							.replace(/\s*г\./, "")}
					</span>
				)}
			</div>
		</>
	);
};

export const UserMetaWithActions: React.FC<TUserMetaWithActions> = (props) => {
	let content;
	switch (props.actionsType) {
		case "article":
			content = (
				<>
					<UserMeta
						username={props.article.author.username}
						createdAt={props.article.createdAt}
						imageUrl={props.article.author.image}
					/>
					<div className={styles["actions"]}>
						<ArticleActions
							canModify={props.canModify}
							article={props.article}
						/>
					</div>
				</>
			);
			break;
		case "commentBox":
			content = (
				<>
					<UserMeta
						username={props.comment.author.username}
						createdAt={props.comment.createdAt}
						imageUrl={props.comment.author.image}
					/>
					<div className={styles["actions"]}>
						<CommentBoxActions
							canModify={props.canDelete}
							comment={props.comment}
							slug={props.slug}
						/>
					</div>
				</>
			);
			break;
		case "commentInput":
			content = (
				<>
					<UserMeta
						username={props.user.username}
						imageUrl={props.user.image}
					/>
					<div className={styles["actions"]}>
						<CommentInputActions />
					</div>
				</>
			);
			break;
	}

	return (
		<div className={`${styles["user-meta"]} text_type_main-default`}>
			{content}
		</div>
	);
};
