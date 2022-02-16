import React, { ChangeEvent, FC } from "react";
import styles from './ProfileData.module.css';
import userPhoto from './../../../../assets/images/user_icon.png';
import Contact from "./Contact/Contact";
import { ProfileType } from "../../../types/types";

type PropsType = {
    isOwner: boolean
    profile: ProfileType
    savePhoto: (photoFile: any) => void
    switchOnEditMode: () => void
}

const ProfileData: FC<PropsType> = (props): JSX.Element => {    
    const handleSelectedPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;
        if (files?.length === 1) {
            props.savePhoto(files[0]);
        }
    }
    return (
        <div className={styles.descriptionBlock}>         
            {props.isOwner && <div><button onClick={props.switchOnEditMode}>Edit profile</button></div>}
            <img src={props.profile.photos?.large || userPhoto} alt={props.profile.fullName} className={styles.photo}/>
            {props.isOwner && <div><input type="file" onChange={handleSelectedPhoto} /></div>}
            <div>
                <b>Полное имя</b>: {props.profile.fullName}
            </div>
            <div>
                <b>Ищу работу</b>: {props.profile.lookingForAJob ? 'Да' : 'Нет'}
            </div>
            {props.profile.lookingForAJob && 
                <div>
                    <b>Мои профессиональные навыки</b>: {props.profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>Обо мне</b>: {props.profile.aboutMe}
            </div>            
            <div>
                <b>Мои контакты</b>:
            </div>
            <div className={styles.contacts}>
                { Object.entries(props.profile.contacts)
                    .filter((value: Array<string>) => value[1] !== null )
                    .map((value: Array<string>) => {
                        return <Contact key={value[0]} contactTitle={value[0]} contactLink={value[1]}/>
                    })
                }
            </div>
        </div>
    );
}

export default ProfileData;
