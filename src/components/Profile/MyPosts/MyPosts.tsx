import React, { FC } from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import { actionCreators } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';
import { receivePosts } from '../../../redux/selectors/profile-selectors';
import { PostType } from '../../types/types';
import { AppStateType } from '../../../redux/redux-store';
import AddPostReduxForm from './MyPostForm';

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostBody: string) => void
}

const MyPosts: FC<PropsType> = (props): JSX.Element => {
    const postElements = [...props.posts].reverse().map(p => 
        <Post message={p.message} like={p.likesCount} key={p.id}/>);
    
    const onAddPost = (value: any) => {    
        props.addPost(value.newPostBody);
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
}

type MapStatePropsType = {
    posts: Array<PostType>
}

type MapDispatchPropsType = {
    addPost: (newPostBody: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    posts: receivePosts(state)    
})

const { addPost } = actionCreators;
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { addPost })(MyPosts);
