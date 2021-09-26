import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/images/user_icon.png';
import { NavLink } from 'react-router-dom';
import { usersAPI } from '../../api/api';

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);   
    }
    return (
        <div className={style.users}>
            <div className={style.pageNumbers}>
                {pages.map(p => 
                    <span key={p} className={p === props.currentPage ? style.selectedPage : '' } 
                          onClick={() => props.onPageChanged(p)}>{p}</span>    
                )}
            </div>
            {props.users.map(user => 
            <div className={style.user} key={user.id}>
                <div className={style.avatar}>
                    <div>
                        <NavLink to={"/profile/"+user.id}>
                            <img className={style.userPhoto} 
                                 src={ user.photos.small != null ? user.photos.small : userPhoto } 
                                 alt="User" />
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ? 
                            <button disabled={props.followingProgress.some(id => id === user.id)} 
                                onClick={() => {
                                    props.toggleFollowingProgress(true, user.id);
                                    usersAPI.unfollowUser(user.id).then(data => {
                                        if (data.resultCode === 0) {
                                            props.unfollowUser(user.id);
                                        }
                                        props.toggleFollowingProgress(false, user.id);
                                    });
                                }}>Unfollowed</button> : 
                            <button disabled={props.followingProgress.some(id => id === user.id)} 
                                onClick={() => {
                                    props.toggleFollowingProgress(true, user.id);
                                    usersAPI.followUser(user.id).then(data => {
                                        if (data.resultCode === 0) {
                                            props.followUser(user.id);
                                        }                               
                                        props.toggleFollowingProgress(false, user.id);
                                    });
                                }}>Followed</button>} 
                    </div>
                </div>
                <div className={style.userInfo}>
                    <div>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </div>
                    <div>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default Users;
