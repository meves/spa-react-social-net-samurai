import { connect } from 'react-redux';
import Navbar from './Navbar';

const mapStateToProps = (state) => {
    return {
        menuItems: state.sidebar.menuItems,
        names: state.sidebar.names
    }
}

const NavbarContainer = connect(mapStateToProps, {})(Navbar);

export default NavbarContainer;
