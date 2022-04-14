import React from "react";
import { Link, withRouter } from "react-router-dom";

import {
	HomeIcon,
	EditIcon,
	SettingsIcon,
	LoginIcon,
	AvatarIcon,
} from "../../assets/icons";

import styles from "./navbar.module.css";

const LoggedInView = ({ currentUser, history }) => {
	console.log(history);
	return (
		currentUser && (
			<ul>
				<li className={styles["navbar_primary"]}>
					<Link to="/" className={"text text_type_main-default"}>
						<div className={styles["icon_padding"]}>
							<HomeIcon type="primary" />
						</div>
						Главная
					</Link>
				</li>
				<li className={styles["navbar_secondary"]}>
					<Link to="/editor" className={"text text_type_main-default"}>
						<div className={styles["icon_padding"]}>
							<EditIcon type="secondary" />
						</div>
						Новая запись
					</Link>
				</li>
				<li className={styles["navbar_secondary"]}>
					<Link to="/settings" className={"text text_type_main-default"}>
						<div className={styles["icon_padding"]}>
							<SettingsIcon type="secondary" />
						</div>
						Настройки
					</Link>
				</li>
				<li className={styles["navbar_secondary"]}>
					<Link
						to={`/@${currentUser.username}`}
						className={"text text_type_main-default"}
					>
						<div className={styles["icon_padding"]}>
							<AvatarIcon type="secondary" />
						</div>
						{currentUser.username}
					</Link>
				</li>
			</ul>
		)
	);
};

const LoggedOutView = ({ currentUser }) => {
	return (
		!currentUser && (
			<ul>
				<li className={styles["navbar_primary"]}>
					<Link to="/" className={"text text_type_main-default"}>
						<div className={styles["icon_padding"]}>
							<HomeIcon />
						</div>
						Главная
					</Link>
				</li>
				<li className={styles["navbar_secondary"]}>
					<Link to="/login" className={"text text_type_main-default"}>
						<div className={styles["icon_padding"]}>
							<LoginIcon type="secondary" />
						</div>
						Войти
					</Link>
				</li>
			</ul>
		)
	);
};
function Navbar({ appName, currentUser, history }) {
	console.log(history);
	return (
		<div className={styles["navbar_container"]}>
			<nav className={styles["navbar"]}>
				<a
					href="/"
					className={`${styles["navbar_shadow"]} text text_type_main-headline`}
				>
					Проектная кухня
				</a>
				<LoggedOutView currentUser={currentUser} />
				<LoggedInView currentUser={currentUser} />
			</nav>
		</div>
	);
}

export default withRouter(Navbar);
