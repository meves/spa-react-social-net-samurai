import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';
import { addTextValueActionCreator, addTextPostActionCreator } from '../../redux/dialog-reducer';

const Dialogs = (props) => {
    const dialogElements = props.dialogPage.dialogs.map(d => <DialogItem id={d.id} name={d.name} /> );
    const messageElements = props.dialogPage.messages.map(m => <Message message={m.message}/>);
    const newPost = React.createRef();
    
    const onChangeHandler = () => {
        let text = newPost.current.value;
        props.dispatch(addTextValueActionCreator(text));
    }
    
    const addPost = () => {
        props.dispatch(addTextPostActionCreator());
    }

    return (
        <div className={s.dialogs}>
            <ul className={s.dialogsItems}>
                { dialogElements }                
            </ul>
            <div className={s.messages}>
                { messageElements }
            </div>  
            <div>
                <textarea onChange={onChangeHandler} ref={ newPost } 
                          cols="30" rows="3" 
                          value={props.dialogPage.textValue}/>    
                <button onClick={addPost}>Add post</button>
            </div>       
        </div>
    );
}

export default Dialogs;
