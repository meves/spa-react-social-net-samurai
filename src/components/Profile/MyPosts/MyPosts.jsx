import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import { required, maxLength10 } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { addPost } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';
import { receivePosts } from '../../../redux/selectors/profile-selectors';

const AddPostForm = (props) => {
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

const MyPosts = (props) => {
    const postElements = [...props.posts].reverse().map(p => 
        <Post message={p.message} like={p.likesCount} key={p.id}/>);
    
    const onAddPost = (value) => {    
        props.addPost(value.newPostBody);
    }
    
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostReduxForm onSubmit={onAddPost}/>          
            <div className={s.posts}>
            { postElements }
            </div>
        </div>       
    );        
}

const mapStateToProps = (state) => {
    return {
        posts: receivePosts(state)
    };
}

export default connect(mapStateToProps, { addPost })(MyPosts);
