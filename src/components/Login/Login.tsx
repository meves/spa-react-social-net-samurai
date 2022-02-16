import React, { FC }  from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import { receiveIsAuth, receiveCaptchaUrl } from '../../redux/selectors/auth-selectors';
import { AppStateType } from '../../redux/redux-store';
import LoginReduxForm, { LoginFormValueType } from './LoginForm';

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    loginUser: (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined) => void
}

type LoginPropsType = MapStatePropsType & MapDispatchPropsType

const Login: FC<LoginPropsType> = (props) => {
    const myHandleSubmit = (value: LoginFormValueType) => {
        let {email, password, rememberMe, captcha} = value;
        props.loginUser(email, password, rememberMe, captcha);
    }
    if (props.isAuth) {
        return <Redirect to="/profile" />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={myHandleSubmit} 
                            captchaUrl={props.captchaUrl}
            />
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: receiveIsAuth(state),
        captchaUrl: receiveCaptchaUrl(state)
    };
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {loginUser})(Login);
