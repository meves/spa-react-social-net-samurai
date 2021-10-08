import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Preloader from '../common/Preloader/Preloader';

const Header = (props) => {
    const logout = () => {
      props.logoutUser();
    }
    return (
      <header className={s.header}>
        <img src="https://tinyurl.com/hujmt3dc" alt="FC Krasnodar" />
        <p>New Age Social Net</p>
        {props.isFetcing ? 
          <Preloader/> :
          <div className={s.loginBlock}>
            {props.isAuth ? <div>{props.login} <button onClick={logout}>Logout</button></div>
                          : <NavLink to="/login/" >Login</NavLink>}
          </div>   
        }
      </header>
    );
};

export default Header;
