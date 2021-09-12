import s from './Navbar.module.css';
import Friends from './Friends/Friends';
import Navigation from './Navigation/Navigation';
import StoreContext from '../../StoreContext';

const Nav = (props) => {
    return (
      <StoreContext.Consumer>{(store) => {
        const state = store.getState();
        return <div className={s.navWrapper} >
                  <Navigation menuItems={state.sidebar.menuItems} />     
                  <Friends names={state.sidebar.names}/>
               </div>
      }}      
      </StoreContext.Consumer>
    );
};

export default Nav;
