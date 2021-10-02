import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user_icon.png';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return (
            <Preloader />
        );
    }
    const contacts = [];
    for (let [key, value] of Object.entries(props.profile.contacts)) {
        if (value !== null) {
            contacts.push(
                <a href={value} key={key}>{key}</a>
            );
        }
    }
    return (
        <div>
            <div className={s.image}>
                {<img src="https://tinyurl.com/2ejwewjn" alt="Beach" />}
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.small !== null ? props.profile.photos.small : userPhoto} alt={props.profile.fullName}/>
                <ProfileStatus {...props}/>
                <h2>{props.profile.aboutMe}</h2>
                {props.profile.lookingForAJob ? <p>Ищу работу</p> : ''}
                <p>{props.profile.lookingForAJobDescription}</p>
                <div className={s.contacts}>
                    { contacts }
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
