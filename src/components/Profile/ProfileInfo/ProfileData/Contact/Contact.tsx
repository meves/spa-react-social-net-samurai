import React, { FC } from "react";
import styles from './Contact.module.css';

type PropsType = {
    contactLink: string
    contactTitle: string
}

const Contact: FC<PropsType> = (props): JSX.Element => {
    return (
        <div className={styles.contact}>
            <a className={styles.contactLink} href={props.contactLink}>{props.contactTitle}</a>
        </div>
    );
}

export default Contact;
