import React, { FC } from "react";
import style from './Users.module.css';
import userPhoto from '../../assets/images/user_icon.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../types/types'

type PropsType = {
    key: number
    user: UserType 
    followingProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: FC<PropsType> = ({user, ...props}) => {
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
                                onClick={() => {props.unfollow(user.id);}}>Unfollowed</button> : 
                            <button disabled={props.followingProgress.some(id => id === user.id)} 
                                onClick={() => { props.follow(user.id);}}>Followed</button>} 
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

export default User;
