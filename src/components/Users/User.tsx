import React, { FC } from "react";
import style from './Users.module.css';
import userPhoto from '../../assets/images/user_icon.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../types/types'

export type UserPropsType = {
    user: UserType 
    followingProgress: Array<number>
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
}

export const User: FC<UserPropsType> = (props) => {
    const user = props.user;
    
    return (
        <div className={style.user}>
                <div className={style.avatar}>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                            <img className={style.userPhoto} 
                                 src={ user.photos.small != null ? user.photos.small : userPhoto } 
                                 alt="User" />
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ? 
                            <button disabled={props.followingProgress.some(id => id === user.id)} 
                                onClick={() => {props.unfollowUser(user.id);}}>Unfollowed</button> : 
                            <button disabled={props.followingProgress.some(id => id === user.id)} 
                                onClick={() => {props.followUser(user.id);}}>Followed</button>} 
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
    );
}
