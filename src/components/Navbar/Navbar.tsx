import React, { FC } from 'react';
import styles from './Navbar.module.css';
import Friends from './Friends/Friends';
import Navigation from './Navigation/Navigation';
import { NameType } from '../types/types';

type PropsType = {
    names: Array<NameType>
}

const Navbar: FC<PropsType> = (props): JSX.Element => {
    return (
            <div className={styles.navWrapper} >
                  <Navigation menuItems={["Profile", "Dialogs", "News", "Music", "Settings", "Users"]} />     
                  <Friends names={props.names}/>
            </div>
    );
};

export default Navbar;
