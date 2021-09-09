import s from './Navbar.module.css';
import Friends from './Friends/Friends';
import Navigation from './Navigation/Navigation';

const Nav = (props) => {
    return (
      <div className={s.navWrapper} >
         <Navigation menuItems={props.sidebar.menuItems} />     
         <Friends names={props.sidebar.names}/>
      </div>
    );
};

export default Nav;