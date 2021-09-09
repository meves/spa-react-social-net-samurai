import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';

const MyPosts = (props) => {
    const postElements = props.posts.map(p => <Post message={p.message} like={p.likesCount} key={p.id}/>);
    
    let newPostElement = React.createRef();
    
    const onAddPost = () => {    
       props.dispatch(addPostActionCreator());
    }

    const onPostChange = () => {
        let text = newPostElement.current.value; 
        props.dispatch(updateNewPostTextActionCreator(text));
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>    
                <textarea onChange={onPostChange} ref={ newPostElement } 
                          cols="30" rows="3" value={props.newPostText}/>
            </div>
            <div>
                <button onClick={ onAddPost }>Add post</button> 
            </div>            
            <div className={s.posts}>
               { postElements }
            </div>
        </div>
    );
}

export default MyPosts;