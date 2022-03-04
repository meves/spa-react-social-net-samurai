import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { follow, unfollow, getUsers, getCurrentPageUsers, FilterType } from "../../redux/user-reducer";
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';
import { receiveCustomUsers, receivePageSize, receiveTotalUsersCount, receiveFollowingProgress,
         receiveCurrentPage, receiveIsFetching, receiveFilter } from '../../redux/selectors/users-selectors';
import { UserType } from '../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    followingProgress: Array<number>
    currentPage: number
    isFetching: boolean
    filter: FilterType
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (pageSize: number, currentPage: number, filter: FilterType) => void
    getCurrentPageUsers: (pageSize: number, pageNumber: number, filter: FilterType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {    
    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage, this.props.filter);
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize, filter } = this.props;
        this.props.getCurrentPageUsers(pageSize, pageNumber, filter); 
    }

    onFilterChanged = (filter: FilterType) => {
        const currentPage = 1;
        this.props.getCurrentPageUsers(this.props.pageSize, currentPage, filter); 
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
                    onPageChanged={this.onPageChanged}
                    onFilterChanged={this.onFilterChanged}
                    />
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
        isFetching: receiveIsFetching(state),
        filter: receiveFilter(state)
    };
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { follow, unfollow, getUsers, getCurrentPageUsers }),
    withConnectedAuthRedirect)(UsersContainer);
