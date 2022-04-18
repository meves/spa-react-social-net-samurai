import React, { FC, useEffect } from 'react';
import style from './Users.module.css';
import Paginator from '../Paginator/Paginator';
import { User } from './User';
import { UserType } from '../types/types';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, follow, getCurrentPageUsers, getUsers, unfollow } from '../../redux/user-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { receiveCurrentPage, receiveCustomUsers, receiveFilter, 
        receiveFollowingProgress, 
        receivePageSize, receiveTotalUsersCount } from '../../redux/selectors/users-selectors';

type PropsType = {}

export const Users: FC<PropsType> = (props) => {
    const totalUsersCount = useSelector(receiveTotalUsersCount);
    const currentPage = useSelector(receiveCurrentPage);
    const pageSize = useSelector(receivePageSize);
    const users = useSelector(receiveCustomUsers);
    const filter = useSelector(receiveFilter);
    const followingProgress = useSelector(receiveFollowingProgress);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers(pageSize, currentPage));
    }, []);
    const onPageChanged = (pageNumber: number) => {
        dispatch(getCurrentPageUsers(pageSize, pageNumber, filter)); 
    }
    const onFilterChanged = (filter: FilterType) => {
        const currentPage = 1;
        dispatch(getCurrentPageUsers(pageSize, currentPage, filter)); 
    }    
    const followUser = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    }
    return (
        <div className={style.users}>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage} onPageChanged={onPageChanged}/>            
            {users.map((user: UserType) => 
                (<User key={user.id} user={user} 
                    followingProgress={followingProgress}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                />)            
            )}
        </div>
    );
}
