import React, { FC } from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPosts';
import { ProfileType } from '../../types/types'

type PropsType = {
    isOwner: boolean
    profile: ProfileType | null
    userId: number
    status: string
    saveUserProfile: (profile: ProfileType| null) => any
    savePhoto: (photoFile: any) => void
    updateStatus: (status: string) => void
}

const Profile: FC<PropsType> = (props): JSX.Element => {
    return (
        <div className={styles.content}>
            <ProfileInfo {...props}/>
            <MyPostsContainer />
        </div>
    );
};

export default Profile;
