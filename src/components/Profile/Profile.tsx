import React, { FC, useEffect } from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { MyPosts } from './MyPosts/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { receiveUserId } from '../../redux/selectors/auth-selectors';
import { getUserProfile, getStatus } from '../../redux/profile-reducer'; 
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';

type PropsType = {
    isOwner: boolean
    match: any
}

const ProfilePage: FC<PropsType> = (props) => {
    const userId = useSelector(receiveUserId);
    const dispatch = useDispatch();

    useEffect(() => {
        let id: number = props.match.params.userId || userId;
        dispatch(getUserProfile(id));
        dispatch(getStatus(id));
    }, [props.match.params.userId]);

    return (
        <div className={styles.content}>
            <ProfileInfo 
                         isOwner={!props.match.params.userId}    
                         userId={userId}
                         />
            <MyPosts />
        </div>
    );
};

export const Profile = compose(
    withConnectedAuthRedirect,
    withRouter )( ProfilePage ) as React.ComponentType<unknown>;

