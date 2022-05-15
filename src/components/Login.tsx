import {Link} from "react-router-dom";
import ListErrors from "./ListErrors";
import React, {useEffect, useState} from "react";
import agent from "../agent";
import {useDispatch, useSelector} from "react-redux";
import {
    UPDATE_FIELD_AUTH,
    LOGIN,
    LOGIN_PAGE_UNLOADED,
} from "../constants/actionTypes";

import EyeIcon from "../assets/icons/eye-icon";

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const state = useSelector<any, AuthForm>(state => state.auth);

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const passwordVisibleToggle = (event: React.SyntheticEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        setPasswordVisible((state) => !state);
    };

    const changeEmail = (event: React.SyntheticEvent<HTMLInputElement>) => {
        dispatch({type: UPDATE_FIELD_AUTH, key: "email", value: event.currentTarget.value})
    };

    const changePassword = (event: React.SyntheticEvent<HTMLInputElement>) => {
        dispatch({type: UPDATE_FIELD_AUTH, key: "password", value: event.currentTarget.value});
    };

    const submitForm = (email: string, password: string) => (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({type: LOGIN, payload: agent.Auth.login(email, password)});
    };

    const onUnload = () => {
        dispatch({type: LOGIN_PAGE_UNLOADED});
    };

    useEffect((): () => void => onUnload, []); // unmount

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h2 className="text-xs-center">Войти</h2>
                        <p className="text-xs-center">
                            <Link to="/register">Хотите создать аккаунт??</Link>
                        </p>

                        {<ListErrors errors={state.errors}/>}

                        <form onSubmit={submitForm(state.email, state.password)}>

                            <div className="form-group">
                                <label className="form-control-label" htmlFor="form-email">E-mail</label>
                                <div className="form-controls">
                                    <input
                                        id="form-email" className="form-control form-control-lg"
                                        type="email" placeholder="E-mail" value={state.email}
                                        onChange={changeEmail}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-control-label" htmlFor="form-password">Пароль</label>
                                <div className="form-controls">
                                    <a href="#" className="form-control-icon" onClick={passwordVisibleToggle}>
                                        <EyeIcon/>
                                    </a>
                                    <input
                                        id="form-password" className="form-control form-control-lg"
                                        type={passwordVisible ? 'text' : 'password'} placeholder="Пароль"
                                        value={state.password}
                                        onChange={changePassword}
                                    />
                                </div>
                            </div>

                            <button
                                className="btn form-button pull-xs-right"
                                type="submit"
                                disabled={state.inProgress}
                            >
                                Войти
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;