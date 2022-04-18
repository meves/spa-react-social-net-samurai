import React, { FC } from 'react';
import style from './Preloader.module.css';
import preloader from '../../../assets/images/preloader.gif';

const Preloader: FC = () => {
    return (
        <img className={style.preloader} src={preloader} alt="scrolling"/>
    );
}

export default Preloader;
