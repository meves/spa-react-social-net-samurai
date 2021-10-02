import { connect } from "react-redux";
import React from 'react';
import Header from "./Header";
import { getAuthMe } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthMe();        
    }
    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const matStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        photo: state.auth.photo,
        isFetching: state.auth.isFetching
    };
}

export default connect(matStateToProps, { getAuthMe })(HeaderContainer);
