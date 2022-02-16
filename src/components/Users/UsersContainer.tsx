import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { follow, unfollow, getUsers, getCurrentPageUsers } from "../../redux/user-reducer";
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';
import { receiveCustomUsers, receivePageSize, receiveTotalUsersCount, receiveFollowingProgress,
         receiveCurrentPage, receiveIsFetching } from '../../redux/selectors/users-selectors';
import { UserType } from '../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    followingProgress: Array<number>
    currentPage: number
    isFetching: boolean
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (pageSize: number, currentPage: number) => void
    getCurrentPageUsers: (pageSize: number, pageNumber: number) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {    
    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    onPageChanged = (pageNumber: number) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: receiveCustomUsers(state),
        pageSize: receivePageSize(state),
        totalUsersCount: receiveTotalUsersCount(state),
        followingProgress: receiveFollowingProgress(state),
        currentPage: receiveCurrentPage(state),
        isFetching: receiveIsFetching(state)
    };
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {follow, unfollow, getUsers, getCurrentPageUsers}),
    withConnectedAuthRedirect)(UsersContainer);
