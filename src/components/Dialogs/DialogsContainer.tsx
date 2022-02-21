import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { actions } from "../../redux/dialog-reducer";
import { DialogType, MessageType } from '../types/types';
import { receiveDialogs, receiveMessages } from '../../redux/selectors/dialogs-selectors';
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';
import Dialogs from "./Dialogs";

type MapStatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

type MapDispatchPropsType = {
    addPost: (newMessageBody: string) => void
}

type OwnPropsType = { }

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class DialogsContainer extends React.Component<PropsType> {    
    render() {        
        return (
            <Dialogs {...this.props}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {    
    return {
        dialogs: receiveDialogs(state),
        messages: receiveMessages(state)
    };
}

const { addPost } = actions;
export default compose( 
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>( mapStateToProps, { addPost } ),
    withConnectedAuthRedirect )( DialogsContainer );
