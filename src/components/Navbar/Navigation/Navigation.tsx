import React, { FC } from 'react';
import styles from './../Navbar.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
  menuItems: Array<string>
}

const Navigation: FC<PropsType> = (props): JSX.Element => {
    const navLinks = props.menuItems.map((entry: string): JSX.Element => (
        <div className={styles.item} key={entry}>
          <NavLink to={`/${entry.toLowerCase()}`} activeClassName={styles.active}>{entry}</NavLink>
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
