import { connect } from "react-redux";
import React from 'react';
import Header from "./Header";
import { logoutUser } from '../../redux/auth-reducer';
import { receiveIsAuth, receiveLogin, receivePhoto, receiveIsFetching } from '../../redux/selectors/auth-selectors';

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const matStateToProps = (state) => {
    return {
        isAuth: receiveIsAuth(state),
        login: receiveLogin(state),
        photo: receivePhoto(state),
        isFetching: receiveIsFetching(state)
    };
}

export default connect(matStateToProps, { logoutUser })(HeaderContainer);
