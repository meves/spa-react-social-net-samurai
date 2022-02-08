import React, { FC } from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { reduxForm, Field } from 'redux-form'; 
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLength10 } from '../../utils/validators/validators';
import { DialogType, MessageType } from '../../types/types';

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newMessageBody" label="Enter your message"
            validate={[required, maxLength10]} cols="30" rows="3" />
            <button>Add Post</button>
        </form>
    );
}

const AddMessageReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

type DialogPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addPost: (newMessageBody: string) => void
}

const Dialogs: FC<DialogPropsType> = (props) => {
    const dialogElements: Array<JSX.Element> = props.dialogs.map((d: DialogType) => (
        <DialogItem key={d.id} id={d.id} name={d.name} />) );
    const messageElements: Array<JSX.Element> = props.messages.map((m: MessageType) => (
        <Message message={m.message} key={m.id}/>) );
    
    const onAddPost = (value: any) => {
        props.addPost(value.newMessageBody);
    }
    
    return (
        <div className={styles.dialogs}>
            <ul className={styles.dialogsItems}>
                { dialogElements }                
            </ul>
            <div className={styles.messages}>
                { messageElements }
            </div>  
            <AddMessageReduxForm onSubmit={onAddPost}/>                
        </div>
    );
}

export default Dialogs;
