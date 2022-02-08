import React, { FC, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatusHook';
import ProfileData from './ProfileData/ProfileData';
import ProfileReduxForm from './ProfileForm/ProfileForm';
import { ProfileType } from '../../../types/types';

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    userId: number
    status: string
    saveUserProfile: (profile: ProfileType| null) => any
    savePhoto: (photoFile: any) => void
    updateStatus: (status: string) => void
}

const ProfileInfo: FC<PropsType> = (props): JSX.Element => {
    const [editProfileMode, setEditProfileMode] = useState(false);
    if (!props.profile) {
        return (
            <Preloader />
        );
    }
    const saveProfileData: any = async (profile: ProfileType) => {
        profile.userId = props.userId;
        props.saveUserProfile(profile).then(() => {
            setEditProfileMode(false);
        }).catch((error: any) => error);        
    }
    return (
        <div>
            <div className={styles.image}>
                {<img src="https://tinyurl.com/2ejwewjn" alt="Beach" />}
            </div>
            <ProfileStatus {...props}/>
            {editProfileMode 
             ? <ProfileReduxForm initialValues={props.profile} onSubmit={saveProfileData}/> //contacts={props.profile.contacts} 
             : <ProfileData profile={props.profile} isOwner={props.isOwner} savePhoto={props.savePhoto}
                            switchOnEditMode={() => setEditProfileMode(true)}/>}
        </div>
    );
};

export default ProfileInfo;
