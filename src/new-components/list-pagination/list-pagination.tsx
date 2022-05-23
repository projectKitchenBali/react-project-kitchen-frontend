import agent from "../../agent";
import { connect } from "react-redux";
import { SET_PAGE } from "../../constants/actionTypes";
import React, { Dispatch } from "react";
import { AnyAction } from "redux";

import styles from "./list-pagination.module.css";

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	onSetPage: (page: number, payload: any) =>
		dispatch({ type: SET_PAGE, page, payload }),
});

interface IListPagination {
	onSetPage: (page: number, payload: any) => void;
	pager: (page: number) => void;
	articlesCount: number;
	currentPage: number;
}

const ListPagination: React.FC<IListPagination> = (props) => {
	if (props.articlesCount <= 5) {
		return null;
	}

	const range = [];
	for (let i = 0; i < Math.ceil(props.articlesCount / 5); ++i) {
		range.push(i);
	}

	const setPage = (page: number) => {
		if (props.pager) {
			console.log(props.pager);
			props.onSetPage(page, props.pager(page));
		} else {
			props.onSetPage(page, agent.Articles.all(page));
		}
	};

	return (
		<nav className={styles["container"]}>
			<ul className={styles["pagination"]}>
				{range.map((v) => {
					const isCurrent = v === props.currentPage;
					const onClick = (ev: React.SyntheticEvent) => {
						ev.preventDefault();
						setPage(v);
					};
					return (
						<li
							className={`${
								isCurrent
									? `${styles["page-item"]} ${styles["active"]}`
									: styles["page-item"]
							} text_type_main-default`}
							onClick={onClick}
							key={v.toString()}
						>
							{v + 1}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
