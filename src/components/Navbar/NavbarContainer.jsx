import { connect } from 'react-redux';
import Navbar from './Navbar';
import { receiveMenuItems, receiveNames } from '../../redux/selectors/navbar-selectors';

const mapStateToProps = (state) => {
    return {
        menuItems: receiveMenuItems(state),
        names: receiveNames(state)
    }
}

const NavbarContainer = connect(mapStateToProps, {})(Navbar);

export default NavbarContainer;
