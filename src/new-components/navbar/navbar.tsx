/* eslint-disable @typescript-eslint/no-explicit-any */
//TODO при переходе на react router v6 от строчки выше можно будет избиться
import { Link, Route } from "react-router-dom";

import {
	HomeIcon,
	EditIcon,
	SettingsIcon,
	LoginIcon,
	AvatarIcon,
} from "../../assets/icons";

import styles from "./navbar.module.css";

interface IUser {
	email: string;
	token: string;
	username: string;
}

interface INavbar {
	appName: string;
	currentUser: IUser;
}

// TODO при переходе на react router v6 от этого можно будет избавиться
// any используются из-за того что я не вижу смысла полноценно типизировать
// этот костыль который все равно уйдет после того как мы перейдем на react router v6
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
}: {
	to: any;
	exact?: boolean;
	strict?: boolean;
	location?: any;
	className?: string;
	activeStyle?: any;
	style?: any;
	isActive?: (match: any, location: any) => boolean;
	children?: any;
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
					{children}
				</Link>
			);
		}}
	</Route>
);

const LoggedInView = ({ currentUser }: { currentUser: IUser }) => {
	return (
		<ul className="text text_type_main-default">
			<li>
				<CustomNavLink to="/" exact={true}>
					<div className={styles["icon_padding"]}>
						<HomeIcon type={"inherit"} />
					</div>
					Главная
				</CustomNavLink>
			</li>
			<li>
				<CustomNavLink to="/editor" exact={true}>
					<div className={styles["icon_padding"]}>
						<EditIcon type={"inherit"} />
					</div>
					Новая запись
				</CustomNavLink>
			</li>
			<li>
				<CustomNavLink to="/settings" exact={true}>
					<div className={styles["icon_padding"]}>
						<SettingsIcon type={"inherit"} />
					</div>
					Настройки
				</CustomNavLink>
			</li>
			<li>
				<CustomNavLink to={`/@${currentUser.username}`}>
					<div className={styles["icon_padding"]}>
						<AvatarIcon />
					</div>
					{currentUser.username}
				</CustomNavLink>
			</li>
		</ul>
	);
};

const LoggedOutView = () => {
	return (
		<ul className="text text_type_main-default">
			<li>
				<CustomNavLink to="/" exact={true}>
					<div className={styles["icon_padding"]}>
						<HomeIcon type={"inherit"} />
					</div>
					Главная
				</CustomNavLink>
			</li>
			<li>
				<CustomNavLink to="/login" exact={true}>
					<div className={styles["icon_padding"]}>
						<LoginIcon type={"inherit"} />
					</div>
					Войти
				</CustomNavLink>
			</li>
		</ul>
	);
};

export function Navbar({ appName, currentUser }: INavbar) {
	return (
		<div className={styles["navbar_container"]}>
			<nav className={styles["navbar"]}>
				<div className={styles["navbar_inner"]}>
					<a
						href="/"
						className={`${styles["navbar_shadow"]} text text_type_main-headline`}
					>
						{appName}
					</a>
					{currentUser ? (
						<LoggedInView currentUser={currentUser} />
					) : (
						<LoggedOutView />
					)}
				</div>
			</nav>
		</div>
	);
}
