import { Link } from "react-router-dom";
import ListErrors from "../../components/ListErrors";
import React, { useEffect, useState } from "react";
import agent from "../../agent";
import { useDispatch, useSelector } from "react-redux";
import {
	LOGIN,
	LOGIN_PAGE_UNLOADED,
	UPDATE_FIELD_AUTH,
} from "../../constants/actionTypes";

import EyeIcon from "../../assets/icons/eye-icon";
import Input from "../input/input";
import cl from "./Login.module.css";
import Button from "../button/button";

const Login: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector<any, AuthForm>((state) => ({
		email: "",
		password: "",
		...state.auth,
	}));

	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const passwordVisibleToggle = (
		event: React.SyntheticEvent<HTMLAnchorElement>
	): void => {
		event.preventDefault();
		setPasswordVisible((state) => !state);
	};

	const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: UPDATE_FIELD_AUTH,
			key: "email",
			value: event.currentTarget.value,
		});
	};

	const changePassword = (event: React.SyntheticEvent<HTMLInputElement>) => {
		dispatch({
			type: UPDATE_FIELD_AUTH,
			key: "password",
			value: event.currentTarget.value,
		});
	};

	const submitForm =
		(email: string, password: string) =>
		(event: React.SyntheticEvent<HTMLFormElement>) => {
			event.preventDefault();
			dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) });
		};

	const onUnload = () => {
		dispatch({ type: LOGIN_PAGE_UNLOADED });
	};

	useEffect((): (() => void) => onUnload, []); // unmount

	return (
		<div className={cl.login_page}>
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h2 className="text-xs-center">Войти</h2>
						<p className={`${cl.margin_group} text-xs-center`}>
							<Link to="/register">Хотите создать аккаунт?</Link>
						</p>

						{<ListErrors errors={state.errors} />}

						<form onSubmit={submitForm(state.email, state.password)}>
							<Input
								label="E-mail"
								type={"email"}
								value={state.email}
								placeholder="E-mail"
								onChange={changeEmail}
							/>
							<Input
								label="Пароль"
								type={passwordVisible ? "text" : "password"}
								value={state.password}
								onChange={changePassword}
								onClick={passwordVisibleToggle}
							>
								<EyeIcon />
							</Input>

							<div className={cl.margin_group}>
								<Button type={"submit"} disabled={state.inProgress}>
									Войти
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
