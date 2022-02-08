import React, { FC } from 'react';
import { NavLink } from "react-router-dom";
import styles from './../Dialogs.module.css';

type PropsType = {
    name: string
    id: number
}

const DialogItem: FC<PropsType> = (props) => {
    let path: string = "/dialogs/" + props.id;
    return (        
        <li className={`${styles.dialog}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </li>
    );
};

export default DialogItem;
