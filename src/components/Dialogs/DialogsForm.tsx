import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form'; 
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLength10 } from '../../utils/validators/validators';

export type FormData = {
    newMessageBody: string
}

const AddMessageForm: FC<InjectedFormProps<FormData>> = (props): JSX.Element => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newMessageBody" label="Enter your message"
            validate={[required, maxLength10]} cols="30" rows="3" />
            <button>Add Post</button>
        </form>
    );
}

export default reduxForm<FormData>({ form: 'dialogAddMessageForm' })(AddMessageForm);
