import React, { FC } from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { DialogType, MessageType } from '../types/types';
import AddMessageReduxForm, { FormData } from './DialogsForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { actions } from '../../redux/dialog-reducer';
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';

const Dialogs: FC = () => {
    const dialogs = useSelector((state: AppStateType) => state.dialogPage.dialogs);
    const dialogElements: Array<JSX.Element> = dialogs.map((d: DialogType) => (
        <DialogItem key={d.id} id={d.id} name={d.name} />) );
        
    const messages = useSelector((state: AppStateType) => state.dialogPage.messages);
    const messageElements: Array<JSX.Element> = messages.map((m: MessageType) => (
        <Message message={m.message} key={m.id}/>) );
            
    const { addPost } = actions;
    const dispatch = useDispatch();
    const onAddPost = (value: FormData) => {
        dispatch(addPost(value.newMessageBody));
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

export default withConnectedAuthRedirect(Dialogs);
