import { connect } from "react-redux";
import React from 'react';
import Header from "./Header";
import { logoutUser } from '../../redux/auth-reducer';
import { receiveIsAuth, receiveLogin } from '../../redux/selectors/auth-selectors';
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    logoutUser: () => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: receiveIsAuth(state),
        login: receiveLogin(state)
    };
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { logoutUser })
    (HeaderContainer);
