import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';

const Dialogs = (props) => {
    const dialogElements = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} /> );
    const messageElements = props.messages.map(m => <Message message={m.message} key={m.id}/>);
    const newPost = React.createRef();
    
    const onChangeHandler = () => {
        let text = newPost.current.value;
        props.changeHandler(text);
    }
    
    const onAddPost = () => {
        props.addPost();
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
                          value={props.textValue}/>    
                <button onClick={onAddPost}>Add post</button>
            </div>       
        </div>
    );
}

export default Dialogs;
