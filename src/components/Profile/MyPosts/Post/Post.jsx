import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.post}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4KWIKwaojpneN3qgoL7Ec2xT4EcwjbQ8ImQ&usqp=CAU" alt="Author" />
            {props.message}
            <div><span>Like: {props.like}</span></div>
        </div>
    );
}

export default Post;