import React, { FC }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import { receiveIsAuth, receiveCaptchaUrl } from '../../redux/selectors/auth-selectors';
import LoginReduxForm, { LoginFormValueType } from './LoginForm';

export const LoginPage: FC = () => {
    const isAuth = useSelector(receiveIsAuth);
    const captchaUrl = useSelector(receiveCaptchaUrl);

    const dispatch = useDispatch();

    const myHandleSubmit = (value: LoginFormValueType) => {
        let {email, password, rememberMe, captcha} = value;
        dispatch(loginUser(email, password, rememberMe, captcha));
    }
    if (isAuth) {
        return <Redirect to="/profile" />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={myHandleSubmit} 
                            captchaUrl={captchaUrl}
            />
        </div>
    );
}
