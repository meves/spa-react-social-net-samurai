import React from 'react';
import style from './Preloader.module.css';
import preloader from '../../../assets/images/preloader.gif';

const Preloader = (props) => {
    return (
        <img className={style.preloader} src={preloader} alt="scrolling"/>
    );
}

export default Preloader;
