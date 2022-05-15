import {Link} from "react-router-dom";
import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import {connect} from "react-redux";
import {
    UPDATE_FIELD_AUTH,
    LOGIN,
    LOGIN_PAGE_UNLOADED,
} from "../constants/actionTypes";

import EyeIcon from "../assets/icons/eye-icon";

const mapStateToProps = (state) => ({...state.auth});

const mapDispatchToProps = (dispatch) => ({
    onChangeEmail: (value) =>
        dispatch({type: UPDATE_FIELD_AUTH, key: "email", value}),
    onChangePassword: (value) =>
        dispatch({type: UPDATE_FIELD_AUTH, key: "password", value}),
    onSubmit: (email, password) =>
        dispatch({type: LOGIN, payload: agent.Auth.login(email, password)}),
    onUnload: () => dispatch({type: LOGIN_PAGE_UNLOADED}),
});

class Login extends React.Component {
    constructor() {
        super();
        this.changeEmail = (ev) => this.props.onChangeEmail(ev.target.value);
        this.changePassword = (ev) => this.props.onChangePassword(ev.target.value);
        this.submitForm = (email, password) => (ev) => {
            ev.preventDefault();
            this.props.onSubmit(email, password);
        };
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;
        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h2 className="text-xs-center">Войти</h2>
                            <p className="text-xs-center">
                                <Link to="/register">Хотите создать аккаунт??</Link>
                            </p>

                            <ListErrors errors={this.props.errors}/>

                            <form onSubmit={this.submitForm(email, password)}>

                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="form-email">E-mail</label>
                                    <div className="form-controls">
                                        <input
                                            id="form-email" className="form-control form-control-lg"
                                            type="email" placeholder="E-mail" value={email}
                                            onChange={this.changeEmail}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="form-password">Пароль</label>
                                    <div className="form-controls">
                                        <a href="#" className="form-control-icon"><EyeIcon /></a>
                                        <input
                                            id="form-password" className="form-control form-control-lg"
                                            type="password" placeholder="Пароль" value={password}
                                            onChange={this.changePassword}
                                        />
                                    </div>
                                </div>

                                <button
                                    className="btn form-button pull-xs-right"
                                    type="submit"
                                    disabled={this.props.inProgress}
                                >
                                    Войти
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
