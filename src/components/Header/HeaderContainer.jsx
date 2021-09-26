import { connect } from "react-redux";
import React from 'react';
import Header from "./Header";
import { setAuthUserData, setOwnerPhoto, showFullName } from '../../redux/auth-reducer';
import { usersAPI } from "../../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.showFullName(true);
        usersAPI.getAuthMe().then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    this.props.showFullName(false);
                    this.props.setAuthUserData(id, email, login);
                    usersAPI.getUserProfile(id).then(data => setOwnerPhoto(data.photos.small) )
                }
            } 
        );        
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

export default connect(matStateToProps, {setAuthUserData, setOwnerPhoto, showFullName})(HeaderContainer);
