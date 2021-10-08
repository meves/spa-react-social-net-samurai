import React  from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/auth-reducer';
import { Input } from '../common/FormsControls/FormsControls';
import { required, email, minLength10 } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import style from '../common/FormsControls/FormsControls.module.css';

const LoginForm = (props) => {
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
                <Field  component={Input} type="checkbox"  label="remember me" name="rememberMe"/>
            </div>
            {props.error &&
            <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const myHandleSubmit = value => {
        let {email, password, rememberMe} = value;
        props.loginUser(email, password, rememberMe);
    }
    if (props.isAuth) {
        return <Redirect to="/profile" />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={myHandleSubmit}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    };
}

export default connect(mapStateToProps, {loginUser})(Login);
