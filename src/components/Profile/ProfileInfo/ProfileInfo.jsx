import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div>
            <div className={s.image}>
                {<img src="https://drupal8-prod.visitcalifornia.com/sites/drupal8-prod.visitcalifornia.com/files/styles/fluid_1200/public/2020-06/VC_Experiences_ReopeningBeaches_RF_1156532604_1280x640.jpg?itok=tPCjquVe" alt="Beach" />}
            </div>
            <div className={s.descriptionBlock}>
                Avatar + description
            </div>
        </div>
    );
};

export default ProfileInfo;