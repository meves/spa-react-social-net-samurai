import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../../assets/images/logo.jpg';

type PropsType = {
  isAuth: boolean
  login: string | null
  logoutUser: () => void 
}

const Header: FC<PropsType> = (props) => {
    const logout = (): void => {
      props.logoutUser();
    }
    return (
      <header className={styles.header}>
        <img src={Logo} alt="Logo" />
        <p>New Age Social Net</p>
          <div className={styles.loginBlock}>
            {props.isAuth ? <div>{props.login} <button onClick={logout}>Logout</button></div>
                          : <NavLink to="/login/" >Login</NavLink>}
          </div>
      </header>
    );
};

export default Header;
