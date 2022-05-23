import { Link } from "react-router-dom";
import ListErrors from "../../components/ListErrors";
import React, { useState, useEffect, FC, FormEvent } from "react";
import agent from "../../agent";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER, REGISTER_PAGE_UNLOADED } from "../../constants/actionTypes";
import Input from "../input/input";
import EyeIcon from "../../assets/icons/eye-icon";
import EyeOffIcon from "../../assets/icons/eye-off-icon";

import styles from "../login/Login.module.css";
import Button from "../button/button";

const Register: FC = () => {
	const dispatch = useDispatch();

	const state = useSelector<{ auth: RegisterForm }, RegisterForm>((state) => ({
		...state.auth,
	}));

	const [formValue, setFormValue] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const passwordVisibleToggle = (
		event: React.SyntheticEvent<HTMLAnchorElement>
	): void => {
		event.preventDefault();
		setPasswordVisible((state) => !state);
	};

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const handleSubmitForm = (e: FormEvent) => {
		e.preventDefault();

		dispatch({
			type: REGISTER,
			payload: agent.Auth.register(
				formValue.name,
				formValue.email,
				formValue.password
			),
		});
	};

	const onUnload = () => {
		dispatch({ type: REGISTER_PAGE_UNLOADED });
	};

	useEffect(() => {
		return () => onUnload();
	}, []);

	// валидация

	const [isNameError, setIsNameError] = useState(false);
	const [isMailError, setIsMailError] = useState(false);
	const [isPasswordError, setIsPasswordError] = useState(false);

	const [nameErrorText, setNameErrorText] = useState("");
	const [mailErrorText, setMailErrorText] = useState("");
	const [passwordErrorText, setPasswordErrorText] = useState("");

	const validateName = (name: string) => {
		const re = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;
		return re.test(name);
	};

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.value) {
			if (e.target.value.length === 1) {
				setIsNameError(!validateName(e.target.value));
				return setNameErrorText("Имя должно быть не менее 2-х символов");
			}
			setIsNameError(!validateName(e.target.value));
			setNameErrorText("Имеется запрещенный символ...не надо так!");
		} else {
			setIsNameError(false);
		}
	};

	const handleMailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setIsMailError(!validateEmail(e.target.value));
			setMailErrorText("Вот так надо email@example.com любезный!");
		} else {
			setIsMailError(false);
		}
	};

	const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.value.length === 0) return setIsPasswordError(false);
		if (e.target.value.length <= 5) {
			setIsPasswordError(true);
			setPasswordErrorText("Пароль должен быть не менее 6 символов");
		} else {
			setIsPasswordError(false);
		}
	};

	return (
		<div className={styles.login_page}>
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h2 className="text-xs-center">Зарегистрироваться</h2>
						<p className={`${styles.margin_group} text-xs-center`}>
							<Link to="/login">Уже есть аккаунт?</Link>
						</p>

						<ListErrors errors={state.errors} />

						<form onSubmit={handleSubmitForm}>
							<Input
								label={"Имя пользователя"}
								type={"text"}
								name={"name"}
								value={formValue.name}
								placeholder={"Username"}
								onChange={handleChange}
								onBlur={handleNameBlur}
								error={isNameError}
								errorText={nameErrorText}
							/>

							<Input
								label={"E-mail"}
								type={"email"}
								name={"email"}
								value={formValue.email}
								placeholder={"email@example.com"}
								onChange={handleChange}
								onBlur={handleMailBlur}
								error={isMailError}
								errorText={mailErrorText}
							/>

							<Input
								label={"Пароль"}
								type={passwordVisible ? "text" : "password"}
								name={"password"}
								value={formValue.password}
								placeholder={"*********"}
								onChange={handleChange}
								onIconClick={passwordVisibleToggle}
								onBlur={handlePasswordBlur}
								error={isPasswordError}
								errorText={passwordErrorText}
							>
								{passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
							</Input>

							<div className={styles.margin_group}>
								<Button type={"submit"} disabled={state.inProgress}>
									Зарегистрироваться
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
