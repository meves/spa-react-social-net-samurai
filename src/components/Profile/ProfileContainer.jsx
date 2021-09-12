import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';

const ProfileContainer = (props) => {
    return (
        <>
        <ProfileInfoContainer />
        <MyPostsContainer />        
        </>
    );
}

export default ProfileContainer;
