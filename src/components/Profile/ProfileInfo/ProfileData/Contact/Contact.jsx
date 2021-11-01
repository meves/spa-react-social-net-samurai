import React from "react";
import styles from './Contact.module.css';

const Contact = (props) => {
    return (
        <div className={styles.contact}>
            <a className={styles.contactLink} href={props.contactLink}>{props.contactTitle}</a>
        </div>
    );
}

export default Contact;
