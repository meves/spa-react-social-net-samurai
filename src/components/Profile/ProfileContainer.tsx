import React from 'react';
import Profile from "./Profile";
import { getUserProfile, getStatus, updateStatus, savePhoto, saveUserProfile } from '../../redux/profile-reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { receiveUserId } from '../../redux/selectors/auth-selectors';
import { receiveProfile, receiveStatus } from '../../redux/selectors/profile-selectors';
import { ProfileType } from '../types/types';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
    userId: number
    profile: ProfileType | null
    match: any
    status: string
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    saveUserProfile: (profile: ProfileType| null) => any
    savePhoto: (photoFile: File) => void
    updateStatus: (status: string) => void
}

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId: number = this.props.match.params.userId || this.props.userId;
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    render() {
        return (
            <Profile isOwner={!this.props.match.params.userId} {...this.props} />
        );
    }
}

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    userId: number | null
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void,
    savePhoto: (photoFile: File) => void,
    saveUserProfile: (profile: ProfileType) => any
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: receiveProfile(state),
    status: receiveStatus(state),
    userId: receiveUserId(state)   
});

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {} , AppStateType>(mapStateToProps, 
        { getUserProfile, getStatus, updateStatus, savePhoto, saveUserProfile }),
    withRouter,
    withConnectedAuthRedirect)(ProfileContainer);
