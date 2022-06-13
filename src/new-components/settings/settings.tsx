import ListErrors from "../../components/ListErrors";
import React, { Dispatch } from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
	LOGOUT,
	SETTINGS_PAGE_UNLOADED,
	SETTINGS_SAVED,
} from "../../constants/actionTypes";
import SettingsForm from "./settings-form";
import { AnyAction } from "redux";
import cl from "./settings.module.css";

interface SettingsProps {
	currentUser: TCurrentUser;
	errors: TErrors;
	onSubmitForm: (payload: TCurrentUser) => void;
	onClickLogout: (event: React.SyntheticEvent) => void;
	onUnload: () => void;
}

interface SettingsState {
	[K: string]: any;

	currentUser: TCurrentUser;
}

const mapStateToProps = (state: SettingsState) => ({
	...state.settings,
	currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	onClickLogout: (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		dispatch({ type: LOGOUT });
	},
	onSubmitForm: (user: TCurrentUser) =>
		dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
	onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
});

const Settings: React.FC<SettingsProps> = (props) => {
	return (
		<div className={cl.page}>
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h2 className="text-xs-center m-b-3 text_type_main-h2">
							Ваши настройки
						</h2>
						<ListErrors errors={props.errors}></ListErrors>
						<SettingsForm
							currentUser={props.currentUser}
							onSubmitForm={props.onSubmitForm}
						/>
						<hr className={cl.hr} />
						<a
							href="#"
							className={`${cl.logout} text_type_main-default`}
							onClick={props.onClickLogout}
						>
							Выйти из аккаунта
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
