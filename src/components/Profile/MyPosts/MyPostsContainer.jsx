import MyPosts from "./MyPosts";
import { updateNewPostTextActionCreator, addPostActionCreator } from "../../../redux/profile-reducer";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = (props) => {    
    return (
        <StoreContext.Consumer>
            {(store) => {
                const state = store.getState();
                const postChange = (text) => {
                    store.dispatch(updateNewPostTextActionCreator(text));
                };
                const addPost = () => {
                    store.dispatch(addPostActionCreator());
                };
                return <MyPosts posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}
                    postChange={postChange}
                    addPost={addPost} />
            }}            
        </StoreContext.Consumer>
    );
};

export default MyPostsContainer;
