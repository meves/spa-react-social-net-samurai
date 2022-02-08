import React, { FC }  from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/auth-reducer';
import { Input } from '../common/FormsControls/FormsControls';
import { required, email, minLength10 } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import { receiveIsAuth, receiveCaptchaUrl } from '../../redux/selectors/auth-selectors';
import styles from '../common/FormsControls/FormsControls.module.css';
import { AppStateType } from '../../redux/redux-store';

const LoginForm = (props: any) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Input} type="email" label="Username" name="email"
                       validate={[required, email]}/>
            </div>
            <div>
                <Field component={Input} type="password" label="Password" name="password"
                       validate={[required, minLength10]}/>
            </div>
            <div>
                <Field component={Input} type="checkbox" label="remember me" name="rememberMe"/>
            </div>
            {props.captchaUrl && <div>
                    <img src={props.captchaUrl} alt="Captcha"/>
                    <Field component={Input} type="text" label="Enter letters from picture" name="captcha" validate={[required]}/>
                </div>}
            {props.error &&
            <div className={styles.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    loginUser: (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined) => void
}

type LoginPropsType = MapStatePropsType & MapDispatchPropsType

const Login: FC<LoginPropsType> = (props) => {
    const myHandleSubmit = (value: any) => {
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
                          //captchaUrl={props.captchaUrl}
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
