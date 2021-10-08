import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';
import { reduxForm, Field } from 'redux-form'; 
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLength10 } from '../../utils/validators/validators';

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newMessageBody" label="Enter your message"
            validate={[required, maxLength10]} cols="30" rows="3" />
            <button>Add Post</button>
        </form>
    );
}

const AddMessageReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

const Dialogs = (props) => {
    const dialogElements = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} /> );
    const messageElements = props.messages.map(m => <Message message={m.message} key={m.id}/>);
    
    const onAddPost = (value) => {
        props.addPost(value.newMessageBody);
    }
    
    return (
        <div className={s.dialogs}>
            <ul className={s.dialogsItems}>
                { dialogElements }                
            </ul>
            <div className={s.messages}>
                { messageElements }
            </div>  
            <AddMessageReduxForm onSubmit={onAddPost}/>                
        </div>
    );
}

export default Dialogs;
