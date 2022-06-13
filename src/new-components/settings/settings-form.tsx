import React from "react";
import Input from "../input/input";
import Button from "../button/button";
import Textarea from "../textarea/textarea";
import cl from './settings.module.css';

interface SettingsFromProps {
    onSubmitForm: (user: SettingsFormState) => any;
    currentUser: TCurrentUser;
}

interface SettingsFormState {
    image: string;
    username: string;
    bio: string;
    email: string;
    password?: string;
    inProgress?: boolean;
}

class SettingsForm extends React.Component<SettingsFromProps, SettingsFormState> {

    state: SettingsFormState = {
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
    };

    updateState = (field: any) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const state = this.state;
        const newState = Object.assign({}, state, {[field]: ev.currentTarget.value});
        this.setState(newState);
    };

    submitForm = (ev: React.SyntheticEvent) => {
        ev.preventDefault();

        const user = Object.assign({}, this.state);
        if (!user.password) {
            delete user.password;
        }

        this.props.onSubmitForm(user);
    };

    componentWillMount() {
        if (this.props.currentUser) {
            Object.assign(this.state, {
                image: this.props.currentUser.image || "",
                username: this.props.currentUser.username,
                bio: this.props.currentUser.bio,
                email: this.props.currentUser.email,
            });
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.currentUser) {
            this.setState(
                Object.assign({}, this.state, {
                    image: nextProps.currentUser.image || "",
                    username: nextProps.currentUser.username,
                    bio: nextProps.currentUser.bio,
                    email: nextProps.currentUser.email,
                })
            );
        }
    }

    render() {
        return (



            <form className={cl.form} onSubmit={this.submitForm}>

                <Input
                    label="Изображение профиля"
                    type={"text"}
                    value={this.state.image}
                    placeholder="Изображение профиля"
                    onChange={this.updateState("image")}
                />

                <Input
                    label="Имя пользователя"
                    type={"text"}
                    value={this.state.username}
                    placeholder="Имя пользователя"
                    onChange={this.updateState("username")}
                />

                <Textarea label="Информация о вас"
                          value={this.state.bio}
                          placeholder="Информация о вас"
                          rows={4}
                          onChange={this.updateState("bio")}
                />

                <Input
                    label="E-mail"
                    type={"email"}
                    value={this.state.email}
                    placeholder="E-mail"
                    onChange={this.updateState("email")}
                />

                <Input
                    label="Новый пароль"
                    type={"password"}
                    value={this.state?.password || ''}
                    placeholder="Новый пароль"
                    onChange={this.updateState("password")}
                >

                </Input>

                <div>


                    <Button type={"submit"} disabled={this.state.inProgress}>
                        Сохранить
                    </Button>

                </div>


            </form>
        );
    }
}

export default SettingsForm;