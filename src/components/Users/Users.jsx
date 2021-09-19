import * as axios from 'axios';
import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/images/user_icon.png';

class Users extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    this.props.setUsers(response.data.items);
        }); 
    }
    render () {
        return (
            <div className={style.users}>
                {this.props.users.map(user => 
                <div className={style.user} key={user.id}>
                    <div className={style.avatar}>
                        <div>
                            <img className={style.userPhoto} src={ user.photos.small != null ? user.photos.small : userPhoto } alt="User" />
                        </div>
                        <div>
                            {user.followed ? 
                                <button onClick={() => this.props.unfollowUser(user.id)}>Unfollowed</button> : 
                                <button onClick={() => this.props.followUser(user.id)}>Followed</button>} 
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
}

export default Users;
