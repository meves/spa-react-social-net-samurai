import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Input, Textarea, Checkbox } from '../../../common/FormsControls/FormsControls';
import { required } from '../../../../utils/validators/validators';
import style from './../../../common/FormsControls/FormsControls.module.css';
import { ContactsType, ProfileType } from '../../../types/types';

type PropsType = {
    contacts: ContactsType
}
const ProfileForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {
    const contacts = props.contacts;
    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset>
                <legend>My profile data</legend>
                <div>
                    <Field component={Input} type="text" label="Full name" name="fullName" validate={[required]}/>
                </div>
                <div>
                    <Field component={Textarea} label="My professional skills" cols="30" rows="5" 
                           name="lookingForAJobDescription" validate={[required]}/>
                </div>
                <div>
                    <Field component={Textarea} label="About me" cols="30" rows="5"
                           name="aboutMe" validate={[required]}/>
                </div>
                <div>
                    <Field component={Checkbox} type="checkbox" label="Looking for a job" name="lookingForAJob"/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Contacts</legend>
                {Object.keys(contacts).map(key => {
                    return (
                        <Field key={key} component={Input} type="text" label={key} name={`contacts.${key}`} />                                                
                    )
                })}
                
            </fieldset>
            {props.error && <div className={style.formSummaryError}>{props.error}</div>}
            <button type="submit">Save</button>
        </form>
    );
}

export default reduxForm<ProfileType, PropsType>({form: 'ProfileForm'})(ProfileForm);
