import React, { FC } from 'react';
import styles from './../Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navigation: FC = () => {
  const menuItems = ["Profile", "Dialogs", "News", "Music", "Settings", "Users"];
  const navLinks = menuItems.map((entry: string, i: number) => (
      <div className={styles.item} key={i}>
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
