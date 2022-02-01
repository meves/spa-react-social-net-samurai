import React from 'react';
import Profile from "./Profile";
import { getUserProfile, getStatus, updateStatus, savePhoto, saveUserProfile } from '../../redux/profile-reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { receiveUserId } from '../../redux/selectors/auth-selectors';
import { receiveProfile, receiveStatus } from '../../redux/selectors/profile-selectors';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId || this.props.userId || null;
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    render() {
        return (
            <Profile isOwner={!this.props.match.params.userId} {...this.props} />
        );
    }
}

const mapStateToProps = (state) => ({
    profile: receiveProfile(state),
    status: receiveStatus(state),
    userId: receiveUserId(state)   
});

export default compose(connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveUserProfile }),
        withRouter,
        withConnectedAuthRedirect)(ProfileContainer);
