import ListErrors from "../../components/ListErrors";
import agent from "../../agent";
import React, { FC, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import styles from "./editor.module.css";

import {
	ADD_TAG,
	EDITOR_PAGE_LOADED,
	REMOVE_TAG,
	ARTICLE_SUBMITTED,
	EDITOR_PAGE_UNLOADED,
	UPDATE_FIELD_EDITOR,
} from "../../constants/actionTypes";
import Input from "../input/input";

const mapDispatchToProps = (dispatch: any) => ({
	onAddTag: () => dispatch({ type: ADD_TAG }),
	onLoad: (payload: any) => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
	onRemoveTag: (tag: any) => dispatch({ type: REMOVE_TAG, tag }),
	onSubmit: (payload: any) => dispatch({ type: ARTICLE_SUBMITTED, payload }),
	onUnload: () => dispatch({ type: EDITOR_PAGE_UNLOADED }),
	onUpdateField: (key: any, value: any) =>
		dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
});

const Editor: FC<{
	onLoad: (payload: any) => void;
	onUnload: () => void;
	match: {
		params: {
			slug: string;
		};
	};
}> = ({ onLoad, onUnload, match }) => {
	const editor = useSelector((store: any) => store.editor);
	const { slug } = match.params;

	useEffect(() => {
		if (slug) {
			onUnload();
			onLoad(agent.Articles.get(slug));
		}
		onLoad(null);
		return function cleanup() {
			onUnload();
		};
	}, [slug]);

	const onClick = (ev: React.SyntheticEvent) => {
		ev.preventDefault();
	};

	const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		console.log(event);
	};

	return (
		<div className={styles.container}>
			<ListErrors errors={editor.errors}></ListErrors>
			<form onSubmit={onClick}>
				<Input
					type="text"
					value={editor.title}
					onChange={onChangeTitle}
					name="title"
				/>
			</form>
		</div>
	);
};

export default connect(() => ({}), mapDispatchToProps)(Editor);
