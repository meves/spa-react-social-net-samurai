import React, { FC } from 'react';
import styles from './Post.module.css';

type PropsType ={
    message: string
    like: number
}

const Post: FC<PropsType> = (props) => {
    return (
        <div className={styles.post}>
            <img src="https://tinyurl.com/wrh9aea6" alt="Author" />
            {props.message}
            <div><span>Like: {props.like}</span></div>
        </div>
    );
}

export default Post;
