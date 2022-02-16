import { connect } from 'react-redux';
import Navbar from './Navbar';
import { receiveNames } from '../../redux/selectors/navbar-selectors';
import { AppStateType } from '../../redux/redux-store';
import { NameType } from '../types/types';

type MapStatePropsType = {
    names: Array<NameType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        names: receiveNames(state)
    }
}

const NavbarContainer = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {})(Navbar);

export default NavbarContainer;
