import React, { FC } from 'react';
import styles from './Friends.module.css';
import AvatarItem from './AvatarItem/AvatarItem';
import { NameType } from '../../types/types';

type PropsType = {
    names: Array<NameType>
}

const Friends: FC<PropsType> = (props): JSX.Element => {
    const friendNames: Array<JSX.Element> = props.names.map((entry: NameType): JSX.Element => ( 
            <AvatarItem name={entry.name} key={entry.id} />) );
    return (
        <div className={styles.friendsWrapper}>
            <h2>Friends</h2>
            <div className={styles.avatarsWrapper}>
                { friendNames }           
            </div>
        </div>
    );
};

export default Friends;
