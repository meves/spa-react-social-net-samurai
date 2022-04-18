import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { required, maxLength10 } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

export type FormData = {
    newPostBody: string
}

const AddPostForm: FC<InjectedFormProps<FormData>> = (props): JSX.Element => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newPostBody" label="Your post" cols="30" rows="3"
                   validate={[required, maxLength10]}/>
            <div>
                <button>Add post</button> 
            </div> 
        </form>
    );
}

export default reduxForm<FormData>({ form: 'addNewPostForm'})(AddPostForm);
