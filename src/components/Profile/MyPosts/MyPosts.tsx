import React, { FC } from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import { required, maxLength10 } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { addPost } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';
import { receivePosts } from '../../../redux/selectors/profile-selectors';
import { PostType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';

const AddPostForm = (props: any) => {
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

const AddPostReduxForm = reduxForm({ form: 'addNewPostForm'})(AddPostForm);

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

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { addPost })(MyPosts);
