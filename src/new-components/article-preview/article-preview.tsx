import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";

import {
	ARTICLE_FAVORITED,
	ARTICLE_UNFAVORITED,
} from "../../constants/actionTypes";
import agent from "../../agent";
import { AvatarIcon, LikeFilledIcon, LikeIcon } from "../../assets/icons";
import Button from "../button/button";

import styles from "./article-preview.module.css";

// type TActionsFavorite = "ARTICLE_FAVORITED" | "ARTICLE_UNFAVORITED";

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	favorite: (slug: string) =>
		dispatch({
			type: ARTICLE_FAVORITED,
			payload: agent.Articles.favorite(slug),
		}),
	unfavorite: (slug: string) =>
		dispatch({
			type: ARTICLE_UNFAVORITED,
			payload: agent.Articles.unfavorite(slug),
		}),
});

type TArticle = {
	slug: string;
	title: string;
	description: string;
	body: string;
	createdAt: string;
	updatedAt: string;
	tagList: string[];
	favorited: boolean;
	favoritesCount: number;
	media?: string;
	author: {
		username: string;
		image: string;
		following: boolean;
	};
};

interface IArticlePreviewProps {
	article: TArticle;
	favorite: (slug: string) => {
		type: string;
		payload: string;
	};
	unfavorite: (slug: string) => {
		type: string;
		payload: string;
	};
}

const ArticlePreview: React.FC<IArticlePreviewProps> = ({
	article,
	favorite,
	unfavorite,
}) => {
	const handleClick = () => {
		if (article.favorited) {
			unfavorite(article.slug);
		} else {
			favorite(article.slug);
		}
	};
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

	return (
		<div className={styles["article-preview"]}>
			{article.media && (
				<div className={styles["media"]}>
					<img src={article.media} alt={article.title} />
				</div>
			)}
			<div className={styles["article-content"]}>
				<div className={`${styles["article-meta"]} text_type_main-default`}>
					<Link
						className={styles["avatar"]}
						to={`/@${article.author.username}`}
					>
						<AvatarIcon width={40} height={40} />
					</Link>

					<div className={styles["info"]}>
						<Link
							className={styles["author"]}
							to={`/@${article.author.username}`}
						>
							{article.author.username}
						</Link>
						<span className={`${styles["date"]} text_type_main-caption`}>
							{new Date(article.createdAt)
								.toLocaleDateString("ru-RU", options)
								.replace(/\s*г\./, "")}
						</span>
					</div>

					<div
						onClick={handleClick}
						className={`${
							article.favorited ? styles["favorited"] : styles["unfavorited"]
						} text_type_main-default`}
					>
						{article.favoritesCount}
						{article.favorited ? (
							<LikeFilledIcon type="error" width={20} height={20} />
						) : (
							<LikeIcon type="primary" width={20} height={20} />
						)}
					</div>
				</div>

				<Link
					to={`/article/${article.slug}`}
					className={styles["preview-link"]}
				>
					<h1 className="text_type_main-headline">{article.title}</h1>
					<p className="text_type_main-default">{article.description}</p>
					<div className={styles["card-links"]}>
						<Button>Читать полностью</Button>
						<ul className={`${styles["tags-list"]} text_type_main-caption`}>
							{article.tagList.map((tag) => {
								return (
									<li
										className={styles["tags-default"]}
										tag-pill
										tag-outline
										key={tag}
									>
										{tag}
									</li>
								);
							})}
						</ul>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
