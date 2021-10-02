import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { follow, unfollow, getUsers, getCurrentPageUsers } from "../../redux/user-reducer";
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class UsersContainer extends React.Component {    
    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    onPageChanged = (pageNumber) => {
        this.props.getCurrentPageUsers(this.props.pageSize, pageNumber); 
    }

    render () {        
        return <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users users={this.props.users}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    followingProgress={this.props.followingProgress}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    onPageChanged={this.onPageChanged}/>
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

export default compose(
    connect(mapStateToProps, {follow, unfollow, getUsers, getCurrentPageUsers}),
    withConnectedAuthRedirect
)(UsersContainer);
