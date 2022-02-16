import React, { FC } from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { DialogType, MessageType } from '../types/types';
import AddMessageReduxForm, { FormData } from './DialogsForm';

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
    
    const onAddPost = (value: FormData) => {
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
