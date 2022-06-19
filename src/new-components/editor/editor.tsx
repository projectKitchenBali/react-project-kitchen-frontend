import ListErrors from "../../components/ListErrors";
import agent from "../../agent";
import React, { FC, useEffect, useMemo } from "react";
import { connect, useSelector } from "react-redux";
import styles from "./editor.module.css";

import {
	EDITOR_PAGE_LOADED,
	ARTICLE_SUBMITTED,
	EDITOR_PAGE_UNLOADED,
	UPDATE_FIELD_EDITOR,
} from "../../constants/actionTypes";
import Input from "../input/input";
import TextArea from "../text-area/text-area";
import Button from "../button/button";

const mapDispatchToProps = (dispatch: any) => ({
	onLoad: (payload: string) => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
	onSubmit: (payload: Promise<any>) =>
		dispatch({ type: ARTICLE_SUBMITTED, payload }),
	onUnload: () => dispatch({ type: EDITOR_PAGE_UNLOADED }),
	onUpdateField: (key: string, value: string) =>
		dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
	onUpdateTags: (key: string, value: Array<string>) =>
		dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
});

interface IEditorForm {
	onLoad: (payload: string) => void;
	onUnload: () => void;
	onUpdateField: (key: string, value: string) => void;
	onUpdateTags: (key: string, value: Array<string>) => void;
	onSubmit: (payload: Promise<any>) => void;
	match: {
		params: {
			slug: string;
		};
	};
}

const Editor: FC<IEditorForm> = ({
	onLoad,
	onUnload,
	onUpdateField,
	onUpdateTags,
	onSubmit,
	match,
}) => {
	const editor = useSelector((store: any) => store.editor);
	const { slug } = match.params;

	useEffect(() => {
		if (slug) {
			onUnload();
			onLoad(agent.Articles.get(slug));
		} else {
			onLoad("");
		}

		return function cleanup() {
			onUnload();
		};
	}, [slug]);

	const updateField = (event: React.ChangeEvent<HTMLInputElement>) =>
		onUpdateField(event.target.name, event.target.value);

	const updateBody = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
		onUpdateField(event.target.name, event.target.value);

	const updateTags = (event: React.ChangeEvent<HTMLInputElement>) => {
		onUpdateTags("tagList", event.target.value.split(", "));
	};

	const onClick = (ev: React.SyntheticEvent) => {
		ev.preventDefault();
		const slug = { slug: editor.articleSlug };
		const promise = editor.articleSlug
			? agent.Articles.update(Object.assign(editor, slug))
			: agent.Articles.create(editor);

		onSubmit(promise);
	};
	const isReadyToPublish = useMemo(() => {
		return editor.title && editor.body && editor.description;
	}, [editor]);

	return (
		<div className={styles.container}>
			<ListErrors errors={editor.errors}></ListErrors>
			<div className={`${styles.title} text_type_main-h2`}>
				{" "}
				{editor.articleSlug ? "Изменить запись" : "Новая запись"}
			</div>
			{editor.title !== undefined && (
				<form onSubmit={onClick} className={styles.form}>
					<Input
						type="text"
						value={editor.title}
						onChange={updateField}
						placeholder="Название статьи"
						label="Заголовок"
						name="title"
					/>
					<Input
						type="text"
						value={editor.description}
						onChange={updateField}
						placeholder="О чем статья"
						label="Описание"
						name="description"
					/>
					<TextArea
						className={`text_type_main-default ${styles.textArea}`}
						placeholder="Текст статьи"
						value={editor.body}
						name="body"
						onChange={updateBody}
						label="Содержание"
						rows={3}
					></TextArea>
					<Input
						type="text"
						value={editor.tagList.join(", ")}
						onChange={updateTags}
						placeholder="Тэги (через запятую)"
						label="Тэги"
						name="tagList"
					/>

					<div className={styles.submit}>
						<Button type={"submit"} disabled={!isReadyToPublish}>
							{editor.articleSlug ? "Изменить" : "Опубликовать"}
						</Button>
					</div>
				</form>
			)}
		</div>
	);
};

export default connect(() => ({}), mapDispatchToProps)(Editor);
