import React, { FC } from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import { actions } from '../../../redux/profile-reducer';
import {  useDispatch, useSelector } from 'react-redux';
import { receivePosts } from '../../../redux/selectors/profile-selectors';
import AddPostReduxForm, { FormData } from './MyPostForm';


export const MyPosts: FC = () => {
    const posts = useSelector(receivePosts);

    const dispatch = useDispatch();
    const { addPost } = actions;

    const postElements = [...posts].reverse().map(p => 
        <Post message={p.message} like={p.likesCount} key={p.id}/>);
    
    const onAddPost = (value: FormData) => {    
        dispatch(addPost(value.newPostBody));
    }
    
    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <AddPostReduxForm onSubmit={onAddPost}/>          
            <div className={styles.posts}>
            { postElements }
            </div>
        </div>       
    );        
};
