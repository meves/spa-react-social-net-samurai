import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    return (
        <div>
            My posts
            <div>
                New post
            </div>
            <textarea name="" id="" cols="30" rows="5"></textarea>
            <button>Add new post</button>
            <button>Remove post</button>
            <div className={s.posts}>
                Posts                
               <Post message="Hi, how are you?" like={10} />
               <Post message="It's myfirst post" like={5} />
            </div>
        </div>
    );
}

export default MyPosts;