import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../../assets/images/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { receiveIsAuth, receiveLogin } from '../../redux/selectors/auth-selectors';
import { logoutUser } from '../../redux/auth-reducer';

export const HeaderPage: FC = () => {
  const isAuth = useSelector(receiveIsAuth);
  const login = useSelector(receiveLogin);
  
  const dispatch = useDispatch();

  const logout = (): void => {
    dispatch(logoutUser());
  }
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" />
      <p>New Age Social Net</p>
        <div className={styles.loginBlock}>
          {isAuth ? <div>{login} <button onClick={logout}>Logout</button></div>
                        : <NavLink to="/login/" >Login</NavLink>}
        </div>
    </header>
  );
};
