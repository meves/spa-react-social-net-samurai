import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    const postElements = props.posts.map(p => 
        <Post message={p.message} like={p.likesCount} key={p.id}/>);
    
    const onPostChange = (event) => {
        let text = event.target.value; 
        props.postChange(text);
    };

    const onAddPost = () => {    
       props.addPost();
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>    
                <textarea onChange={onPostChange} cols="30" rows="3"
                        value={props.newPostText}/>
            </div>
            <div>
                <button onClick={ onAddPost }>Add post</button> 
            </div>            
            <div className={s.posts}>
            { postElements }
            </div>
        </div>       
    );
}

export default MyPosts;
