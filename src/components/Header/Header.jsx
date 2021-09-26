import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Preloader from '../common/Preloader/Preloader';

const Header = (props) => {
    return (
      <header className={s.header}>
        <img src="https://tinyurl.com/hujmt3dc" alt="FC Krasnodar" />
        <p>New Age Social Net</p>
        {props.isFetcing ? 
          <Preloader/> :
          <div className={s.loginBlock}>
            {props.isAuth ? props.login : <NavLink to="/login/" >Login</NavLink>}
          </div>   
        }
      </header>
    );
};

export default Header;
