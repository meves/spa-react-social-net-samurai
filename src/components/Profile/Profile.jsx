import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = (props) => {
    return (
        <div className={s.content}>
            <div className={s.image}>
                {<img src="https://drupal8-prod.visitcalifornia.com/sites/drupal8-prod.visitcalifornia.com/files/styles/fluid_1200/public/2020-06/VC_Experiences_ReopeningBeaches_RF_1156532604_1280x640.jpg?itok=tPCjquVe" alt="Beach" />}
            </div>
            <div>
                Avatar + description
            </div>
            <MyPosts />
        </div>
    );
};

export default Profile;