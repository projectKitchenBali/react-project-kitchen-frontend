import ArticleList from "../article-list/article-list";
import React, { Dispatch, useEffect } from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
	FOLLOW_USER,
	UNFOLLOW_USER,
	PROFILE_PAGE_LOADED,
	PROFILE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import styles from "./profile.module.css";
import { Banner } from "../banner/banner";
import { AnyAction } from "redux";
import { Tab } from "../tab/tab";
import { Link } from "react-router-dom";

type TState = {
	article?: TArticle;
	articleList: TArticleList;
	profile: TUser;
	common: {
		appName: string;
		token: string;
		viewChangeCounter: number;
		appLoaded: boolean;
		currentUser: TCurrentUser;
	};
};

const mapStateToProps = (state: TState) => ({
	articleList: state.articleList,
	currentUser: state.common.currentUser,
	profile: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	onFollow: (username: string) =>
		dispatch({
			type: FOLLOW_USER,
			payload: agent.Profile.follow(username),
		}),
	onLoad: (
		pager: (page: number) => void,
		payload: Promise<[TUser, TArticle]>
	) => dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
	onFavoriteLoad: (
		pager: (page: number) => void,
		payload: Promise<[TUser, TArticle]>
	) => dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
	onUnfollow: (username: string) =>
		dispatch({
			type: UNFOLLOW_USER,
			payload: agent.Profile.unfollow(username),
		}),
	onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

interface IProfile {
	onLoad: (
		pager: (page: number) => void,
		payload: Promise<[TUser, TArticle]>
	) => void;
	onFollow: (payload: string) => void;
	onUnfollow: (payload: string) => void;
	onUnload: () => void;
	onFavoriteLoad: (
		pager: (page: number) => void,
		payload: Promise<[TUser, TArticle]>
	) => void;
	currentUser: TCurrentUser;
	profile: TUser;
	articleList: TArticleList;
	location: {
		pathname: string;
	};
	match: {
		params: {
			username: string;
		};
	};
}

const Profile: React.FC<IProfile> = ({ ...props }) => {
	const [current, setCurrent] = React.useState("Ваши посты");
	const articleList = props.articleList;
	const onFavorite = () => {
		setCurrent("Любимые посты");
		props.onFavoriteLoad(
			(page: number) =>
				agent.Articles.favoritedBy(props.match.params.username, page),
			Promise.all([
				agent.Profile.get(props.match.params.username),
				agent.Articles.favoritedBy(props.match.params.username),
			])
		);
	};
	const onClickAll = () => {
		setCurrent("Ваши посты");
		props.onLoad(
			(page: number) =>
				agent.Articles.byAuthor(props.match.params.username, page),
			Promise.all([
				agent.Profile.get(props.match.params.username),
				agent.Articles.byAuthor(props.match.params.username),
			])
		);
	};

	useEffect(() => {
		if (props.location.pathname.includes("favorites")) {
			onFavorite();
		} else {
			props.onLoad(
				(page: number) =>
					agent.Articles.byAuthor(props.match.params.username, page),
				Promise.all([
					agent.Profile.get(props.match.params.username),
					agent.Articles.byAuthor(props.match.params.username),
				])
			);
		}
		return () => {
			props.onUnload();
		};
	}, []);

	const isUser =
		props.currentUser && props.profile.username === props.currentUser.username;

	return (
		props.profile && (
			<div className={styles["container"]}>
				<Banner
					type="profile"
					isUser={isUser}
					user={props.profile}
					onFollow={props.onFollow}
					onUnfollow={props.onUnfollow}
				/>
				<div className={styles["tabs-toggle"]}>
					<Link to={`/@${props.profile.username}`}>
						<Tab
							value="Ваши посты"
							active={current === "Ваши посты"}
							onClick={onClickAll}
						>
							Ваши посты
						</Tab>
					</Link>

					<Link to={`/@${props.profile.username}/favorites`}>
						<Tab
							value="Любимые посты"
							active={current === "Любимые посты"}
							onClick={onFavorite}
						>
							Любимые посты
						</Tab>
					</Link>
				</div>
				<div className={styles["content"]}>
					<ArticleList
						pager={articleList.pager}
						articles={articleList.articles}
						articlesCount={articleList.articlesCount}
						currentPage={articleList.currentPage}
					/>
				</div>
			</div>
		)
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
