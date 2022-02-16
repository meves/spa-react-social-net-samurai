import React, { FC }  from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required, email, minLength10 } from '../../utils/validators/validators';
import styles from '../common/FormsControls/FormsControls.module.css';

export type LoginFormValueType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean|undefined
}

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValueType, LoginFormOwnProps> & LoginFormOwnProps> = (props): JSX.Element => {
    const { handleSubmit } = props;
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

export default reduxForm<LoginFormValueType, LoginFormOwnProps>({form: 'login'})(LoginForm);
