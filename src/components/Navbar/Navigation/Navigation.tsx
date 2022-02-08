import React, { FC } from 'react';
import styles from './../Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { MenuItemType } from '../../../types/types';

type PropsType = {
  menuItems: Array<MenuItemType>
}

const Navigation: FC<PropsType> = (props): JSX.Element => {
    const navLinks = props.menuItems.map((entry: MenuItemType): JSX.Element => (
        <div className={styles.item} key={entry.id}>
          <NavLink to={entry.to} activeClassName={styles.active}>{entry.itemName}</NavLink>
        </div>
      )
    );
    return (
        <nav className={styles.nav} >
            { navLinks }
        </nav>
    );
};

export default Navigation;
