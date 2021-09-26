import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user_icon.png';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return (
            <Preloader />
        );
    }
    return (
        <div>
            <div className={s.image}>
                {<img src="https://drupal8-prod.visitcalifornia.com/sites/drupal8-prod.visitcalifornia.com/files/styles/fluid_1200/public/2020-06/VC_Experiences_ReopeningBeaches_RF_1156532604_1280x640.jpg?itok=tPCjquVe" alt="Beach" />}
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.small !== null ? props.profile.photos.small : userPhoto} alt={props.profile.fullName}/>
                <h2>{props.profile.aboutMe}</h2>
                {props.profile.lookingForAJob ? <p>Ищу работу</p> : ''}
                <p>{props.profile.lookingForAJobDescription}</p>
                <div className={s.contacts}>
                    <a href={props.profile.contacts.facebook}>Facebook</a>
                    <a href={props.profile.contacts.website}>Website</a>
                    <a href={props.profile.contacts.vk}>VK</a>
                    <a href={props.profile.contacts.twitter}>Twitter</a>
                    <a href={props.profile.contacts.instagram}>Instagram</a>
                    <a href={props.profile.contacts.youtube}>Youtube</a>
                    <a href={props.profile.contacts.github}>Github</a>
                    <a href={props.profile.contacts.mainLink}>MainLink</a>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
