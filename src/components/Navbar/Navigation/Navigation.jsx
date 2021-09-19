import React from 'react';
import s from './../Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
    const navLinks = props.menuItems.map(entry => (
        <div className={s.item} key={entry.id}>
          <NavLink to={entry.to} activeClassName={s.active}>{entry.itemName}</NavLink>
        </div>
      )
    );
    return (
        <nav className={s.nav} >
            { navLinks }
        </nav>
    );
};

export default Navigation;
