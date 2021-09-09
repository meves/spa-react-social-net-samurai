import s from './Friends.module.css';
import AvatarItem from './AvatarItem/AvatarItem';

const Friends = (props) => {
    const friendNames = props.names.map(entry =>  <AvatarItem name={entry.name} key={entry.id} /> );
    return (
        <div className={s.friendsWrapper}>
            <h2>Friends</h2>
            <div className={s.avatarsWrapper}>
                { friendNames }           
            </div>
        </div>
    );
};

export default Friends;