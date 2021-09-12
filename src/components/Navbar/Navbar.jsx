import s from './Navbar.module.css';
import Friends from './Friends/Friends';
import Navigation from './Navigation/Navigation';

const Navbar = (props) => {
    return (
            <div className={s.navWrapper} >
                  <Navigation menuItems={props.menuItems} />     
                  <Friends names={props.names}/>
            </div>
    );
};

export default Navbar;
