import { connect } from 'react-redux';
import Navbar from './Navbar';
import { receiveMenuItems, receiveNames } from '../../redux/selectors/navbar-selectors';
import { AppStateType } from '../../redux/redux-store';
import { MenuItemType, NameType } from '../../types/types';

type MapStatePropsType = {
    menuItems: Array<MenuItemType>
    names: Array<NameType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        menuItems: receiveMenuItems(state),
        names: receiveNames(state)
    }
}

const NavbarContainer = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {})(Navbar);

export default NavbarContainer;
