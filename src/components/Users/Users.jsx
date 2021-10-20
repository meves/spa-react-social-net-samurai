import React from 'react';
import style from './Users.module.css';
import Paginator from '../Paginator/Paginator';
import User from './User';

const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
    
    return (
        <div className={style.users}>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage} onPageChanged={onPageChanged}/>            
            {users.map(user => <User key={user.id} user={user} followingProgress={props.followingProgress}
                                     follow={props.follow} unfollow={props.unfollow}/>
            
            )}
        </div>
    );
}

export default Users;
