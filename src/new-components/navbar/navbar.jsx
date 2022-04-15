import React from "react";
import { Link, Route } from "react-router-dom";

import {
	HomeIcon,
	EditIcon,
	SettingsIcon,
	LoginIcon,
	AvatarIcon,
} from "../../assets/icons";

import styles from "./navbar.module.css";

const CustomNavLink = ({
	to,
	exact,
	strict,
	location,
	className,
	activeStyle,
	style,
	isActive: getIsActive,
	children,
	...rest
}) => (
	<Route
		path={typeof to === "object" ? to.pathname : to}
		exact={exact}
		strict={strict}
		location={location}
	>
		{({ location, match }) => {
			const isActive = !!(getIsActive ? getIsActive(match, location) : match);
			const moddedClassName = `${className || ""} ${
				isActive ? styles["navbar_primary"] : styles["navbar_secondary"]
			}`;
			return (
				<Link
					to={to}
					className={moddedClassName}
					style={isActive ? { ...style, ...activeStyle } : style}
					{...rest}
				>
					{typeof children === "function" ? children({ isActive }) : children}
				</Link>
			);
		}}
	</Route>
);

const LoggedInView = ({ currentUser, history }) => {
	console.log(history);
	return (
		currentUser && (
			<ul>
				<li className="text text_type_main-default">
					<CustomNavLink to="/" exact={true}>
						{({ isActive }) =>
							isActive ? (
								<>
									<div className={styles["icon_padding"]}>
										<HomeIcon type={"none"} />
									</div>
									Главная
								</>
							) : (
								<>
									<div className={styles["icon_padding"]}>
										<HomeIcon type={"none"} />
									</div>
									Главная
								</>
							)
						}
					</CustomNavLink>
				</li>
				<li className="text text_type_main-default">
					<CustomNavLink to="/editor" exact={true}>
						{({ isActive }) =>
							isActive ? (
								<>
									<div className={styles["icon_padding"]}>
										<EditIcon type={"none"} />
									</div>
									Новая запись
								</>
							) : (
								<>
									<div className={styles["icon_padding"]}>
										<EditIcon type={"none"} />
									</div>
									Новая запись
								</>
							)
						}
					</CustomNavLink>
				</li>
				<li className="text text_type_main-default">
					<CustomNavLink to="/settings" exact={true}>
						{({ isActive }) =>
							isActive ? (
								<>
									<div className={styles["icon_padding"]}>
										<SettingsIcon type={"none"} />
									</div>
									Настройки
								</>
							) : (
								<>
									<div className={styles["icon_padding"]}>
										<SettingsIcon type={"none"} />
									</div>
									Настройки
								</>
							)
						}
					</CustomNavLink>
				</li>
				<li className="text text_type_main-default">
					<CustomNavLink to={`/@${currentUser.username}`}>
						{({ isActive }) =>
							isActive ? (
								<>
									<div className={styles["icon_padding"]}>
										<AvatarIcon />
									</div>
									{currentUser.username}
								</>
							) : (
								<>
									<div className={styles["icon_padding"]}>
										<AvatarIcon />
									</div>
									{currentUser.username}
								</>
							)
						}
					</CustomNavLink>
				</li>
			</ul>
		)
	);
};

const LoggedOutView = ({ currentUser }) => {
	return (
		!currentUser && (
			<ul>
				<li className="text text_type_main-default">
					<CustomNavLink to="/" exact={true}>
						{({ isActive }) =>
							isActive ? (
								<>
									<div className={styles["icon_padding"]}>
										<HomeIcon type={"none"} />
									</div>
									Главная
								</>
							) : (
								<>
									<div className={styles["icon_padding"]}>
										<HomeIcon type={"none"} />
									</div>
									Главная
								</>
							)
						}
					</CustomNavLink>
				</li>
				<li className="text text_type_main-default">
					<CustomNavLink to="/login" exact={true}>
						{({ isActive }) =>
							isActive ? (
								<>
									<div className={styles["icon_padding"]}>
										<LoginIcon type={"none"} />
									</div>
									Войти
								</>
							) : (
								<>
									<div className={styles["icon_padding"]}>
										<LoginIcon type={"none"} />
									</div>
									Войти
								</>
							)
						}
					</CustomNavLink>
				</li>
			</ul>
		)
	);
};
function Navbar({ appName, currentUser }) {
	return (
		<div className={styles["navbar_container"]}>
			<nav className={styles["navbar"]}>
				<a
					href="/"
					className={`${styles["navbar_shadow"]} text text_type_main-headline`}
				>
					{appName}
				</a>
				<LoggedOutView currentUser={currentUser} />
				<LoggedInView currentUser={currentUser} />
			</nav>
		</div>
	);
}

export default Navbar;
