import s from './../Friends.module.css';

const AvatarItem = (props) => {
    return (
        <div className={s.avatarItem} id={props.id}>
            <img src="https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s1200" alt={props.name} />
            <p>{props.name}</p>
        </div>
    );
};

export default AvatarItem;