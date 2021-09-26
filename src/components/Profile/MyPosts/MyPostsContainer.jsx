import MyPosts from "./MyPosts";
import { postChange, addPost } from "../../../redux/profile-reducer";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    };
}

const MyPostsContainer = connect(mapStateToProps, { postChange, addPost })(MyPosts);

export default MyPostsContainer;
