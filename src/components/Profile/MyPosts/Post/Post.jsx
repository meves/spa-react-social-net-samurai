import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.post}>
            <img src="https://tinyurl.com/wrh9aea6" alt="Author" />
            {props.message}
            <div><span>Like: {props.like}</span></div>
        </div>
    );
}

export default Post;
