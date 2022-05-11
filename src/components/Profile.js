import ArticleList from "./ArticleList";
import React from "react";
import { Link } from "react-router-dom";
import agent from "../agent";
import { connect } from "react-redux";
import {
	FOLLOW_USER,
	UNFOLLOW_USER,
	PROFILE_PAGE_LOADED,
	PROFILE_PAGE_UNLOADED,
} from "../constants/actionTypes";
import { Banner } from "../new-components/banner/banner";

const mapStateToProps = (state) => ({
	...state.articleList,
	currentUser: state.common.currentUser,
	profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
	onFollow: (username) =>
		dispatch({
			type: FOLLOW_USER,
			payload: agent.Profile.follow(username),
		}),
	onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
	onUnfollow: (username) =>
		dispatch({
			type: UNFOLLOW_USER,
			payload: agent.Profile.unfollow(username),
		}),
	onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

class Profile extends React.Component {
	componentWillMount() {
		this.props.onLoad(
			Promise.all([
				agent.Profile.get(this.props.match.params.username),
				agent.Articles.byAuthor(this.props.match.params.username),
			])
		);
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	renderTabs() {
		return (
			<ul className="nav nav-pills outline-active">
				<li className="nav-item">
					<Link
						className="nav-link active"
						to={`/@${this.props.profile.username}`}
					>
						My Articles
					</Link>
				</li>

				<li className="nav-item">
					<Link
						className="nav-link"
						to={`/@${this.props.profile.username}/favorites`}
					>
						Favorited Articles
					</Link>
				</li>
			</ul>
		);
	}

	render() {
		const profile = this.props.profile;
		if (!profile) {
			return null;
		}

		const isUser =
			this.props.currentUser &&
			this.props.profile.username === this.props.currentUser.username;

		return (
			<div className="profile-page">
				<Banner
					type="profile"
					isUser={isUser}
					user={this.props.profile}
					onFollow={this.props.onFollow}
					onUnfollow={this.props.onUnfollow}
				/>

				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-md-10 offset-md-1">
							<div className="articles-toggle">{this.renderTabs()}</div>

							<ArticleList
								pager={this.props.pager}
								articles={this.props.articles}
								articlesCount={this.props.articlesCount}
								state={this.props.currentPage}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
