import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatusHook';
import ProfileData from './ProfileData/ProfileData';
import ProfileReduxForm from './ProfileForm/ProfileForm';

const ProfileInfo = (props) => {
    const [editProfileMode, setEditProfileMode] = useState(false);
    if (!props.profile) {
        return (
            <Preloader />
        );
    }
    const saveProfileData = async (profile) => {
        profile.userId = props.userId;
        props.saveUserProfile(profile).then(() => {
            setEditProfileMode(false);
        }).catch(error => error);        
    }
    return (
        <div>
            <div className={styles.image}>
                {<img src="https://tinyurl.com/2ejwewjn" alt="Beach" />}
            </div>
            <ProfileStatus {...props}/>
            {editProfileMode 
             ? <ProfileReduxForm profile={props.profile} initialValues={props.profile} onSubmit={saveProfileData}/> 
             : <ProfileData profile={props.profile} isOwner={props.isOwner} savePhoto={props.savePhoto}
                            switchOnEditMode={() => setEditProfileMode(true)}/>}
        </div>
    );
};

export default ProfileInfo;
