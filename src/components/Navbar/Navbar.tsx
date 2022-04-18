import React, { FC } from 'react';
import styles from './Navbar.module.css';
import Friends from './Friends/Friends';
import Navigation from './Navigation/Navigation';

export const NavbarPage: FC = () => {
    return (
            <div className={styles.navWrapper} >
                  <Navigation />     
                  <Friends />
            </div>
    );
};
