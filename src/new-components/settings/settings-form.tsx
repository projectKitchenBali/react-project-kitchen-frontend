import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import Input from "../input/input";
import Button from "../button/button";
import Textarea from "../textarea/textarea";
import {useSelector} from "react-redux";
import EyeOffIcon from "../../assets/icons/eye-off-icon";
import EyeIcon from "../../assets/icons/eye-icon";
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
}

const SettingsForm: React.FC<SettingsFromProps> = ({currentUser, onSubmitForm}) => {

    const [state, setState] = useState<SettingsFormState>({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (!currentUser) return;
        setState({
            password: '',
            image: currentUser.image || "",
            username: currentUser.username,
            bio: currentUser.bio,
            email: currentUser.email
        });
    }, [currentUser]);


    const updateState = (field: string) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({...state, [field]: ev.currentTarget.value})
    };

    const submitForm = (ev: React.FormEvent) => {
        ev.preventDefault();

        const user = Object.assign({}, state);

        if (!user.password) {
            delete user.password;
        }

        onSubmitForm(user);
    };

    const inProgress = useSelector<any, boolean>((state) => state.settings.inProgress);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const passwordVisibleToggle = (event: SyntheticEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setPasswordVisible((state) => !state);
    };

    return (
        <form className={cl.form} onSubmit={submitForm}>

            <Input label="Изображение профиля" type={"text"} value={state.image}
                   placeholder="Изображение профиля" onChange={updateState('image')}/>

            <Input label="Имя пользователя" type={"text"} value={state.username}
                   placeholder="Имя пользователя" onChange={updateState('username')}/>

            <Textarea label="Информация о вас" value={state.bio} placeholder="Информация о вас"
                      rows={4} onChange={updateState('bio')}/>

            <Input label="E-mail" type={"email"} value={state.email}
                   placeholder="E-mail" onChange={updateState('email')}/>

            <Input label="Новый пароль" type={passwordVisible ? "text" : "password"} value={state?.password || ''}
                   placeholder="Новый пароль" onChange={updateState('password')} onIconClick={passwordVisibleToggle}>
                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </Input>

            <div className="m-t-2">
                <Button type={"submit"} disabled={inProgress}>
                    Сохранить
                </Button>
            </div>

        </form>
    )
};

export default SettingsForm;