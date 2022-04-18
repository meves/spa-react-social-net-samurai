import React, { FC } from 'react';
import styles from './Friends.module.css';
import AvatarItem from './AvatarItem/AvatarItem';
import { NameType } from '../../types/types';
import { useSelector } from 'react-redux';
import { receiveNames } from '../../../redux/selectors/navbar-selectors';

const Friends: FC = () => {
    const names = useSelector(receiveNames);
    
    return (
        <div className={styles.friendsWrapper}>
            <h2>Friends</h2>
            <div className={styles.avatarsWrapper}>
                { names.map((entry: NameType) => ( 
                        <AvatarItem name={entry.name} key={entry.id} />
                    ))
                }           
            </div>
        </div>
    );
};

export default Friends;
