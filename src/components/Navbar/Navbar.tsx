import React, { FC } from 'react';
import styles from './Navbar.module.css';
import Friends from './Friends/Friends';
import Navigation from './Navigation/Navigation';
import { MenuItemType, NameType } from '../../types/types';

type PropsType = {
    menuItems: Array<MenuItemType>
    names: Array<NameType>
}

const Navbar: FC<PropsType> = (props): JSX.Element => {
    return (
            <div className={styles.navWrapper} >
                  <Navigation menuItems={props.menuItems} />     
                  <Friends names={props.names}/>
            </div>
    );
};

export default Navbar;
