import React, { FC, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatusHook';
import ProfileData from './ProfileData/ProfileData';
import ProfileReduxForm from './ProfileForm/ProfileForm';
import { ProfileType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { receiveProfile } from '../../../redux/selectors/profile-selectors';
import { saveUserProfile } from '../../../redux/profile-reducer';

type PropsType = {
    isOwner: boolean
    userId: number | null
}

const ProfileInfo: FC<PropsType> = (props) => {
    const profile = useSelector(receiveProfile);

    const dispatch = useDispatch();
    
    const [editProfileMode, setEditProfileMode] = useState(false);

    
    const saveProfileData: any = async (profile: ProfileType) => {
        profile.userId = Number(props.userId);
        try {
            await dispatch(saveUserProfile(profile));
            setEditProfileMode(false);
        } catch(error) {
            return error;        
        }
    }
    if (!profile) {
        return (
            <Preloader />
            );
    } else {
        return (
            <div>
                <div className={styles.image}>
                    {<img src="https://tinyurl.com/2ejwewjn" alt="Beach" />}
                </div>
                <ProfileStatus />
                {editProfileMode 
                 ? <ProfileReduxForm 
                                initialValues={profile}
                                onSubmit={saveProfileData}
                                contacts={profile.contacts} /> 
                 : <ProfileData 
                                isOwner={props.isOwner}
                                profile={profile}
                                switchOnEditMode={() => setEditProfileMode(true)}/>}
            </div>
        );        
    }
};

export default ProfileInfo;
