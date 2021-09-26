import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { followUser, unfollowUser, setUsers,
         setCurrentPage, setTotalUsersCount,
         setIsFetching, toggleFollowingProgress } from "../../redux/user-reducer";
import { usersAPI } from '../../api/api';

class UsersContainer extends React.Component {    
    componentDidMount() {
        this.props.setIsFetching(true);
        usersAPI.getUsers(this.props.pageSize, this.props.currentPage).then(data => {
            this.props.setIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        }); 
    }

    onPageChanged = (pageNumber) => {
        this.props.setIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(this.props.pageSize, pageNumber).then(data => {
            this.props.setIsFetching(false);
            this.props.setUsers(data.items);
        }); 
    }

    render () {        
        return <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    unfollowUser={this.props.unfollowUser}
                    followUser={this.props.followUser}
                    onPageChanged={this.onPageChanged}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingProgress={this.props.followingProgress}/>
               </>
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        isFetching: state.userPage.isFetching,
        followingProgress: state.userPage.followingProgress
    };
}
   
export default connect(mapStateToProps, {
    followUser, unfollowUser, setUsers, setCurrentPage, setTotalUsersCount, setIsFetching, toggleFollowingProgress
})(UsersContainer);
