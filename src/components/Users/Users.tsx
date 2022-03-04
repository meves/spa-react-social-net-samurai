import React, { FC } from 'react';
import style from './Users.module.css';
import Paginator from '../Paginator/Paginator';
import User from './User';
import { UserType } from '../types/types';
import UsersSearchForm from './UsersSearchForm';
import { FilterType } from '../../redux/user-reducer';

type PropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
}

const Users: FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
    
    return (
        <div className={style.users}>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage} onPageChanged={onPageChanged}/>            
            {users.map((user: UserType) => <User key={user.id} user={user} 
                                                 followingProgress={props.followingProgress}
                                                 follow={props.follow} unfollow={props.unfollow}
                                            />
            
            )}
        </div>
    );
}

export default Users;
