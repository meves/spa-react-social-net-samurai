import Users from "./Users";
import { connect } from "react-redux";
import { followAC, unfollowAC, setUsersAC } from "../../redux/user-reducer";

const mapStateToProps = (state) => {
    return {
        users: state.userPage.users
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userId) => {
            dispatch(followAC(userId));
        },
        unfollowUser: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        }
    };
}    
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default  UsersContainer;
