import React from 'react';
import Dialogs from "./Dialogs";
import { addPost } from "../../redux/dialog-reducer";
import { connect } from 'react-redux';
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { receiveDialogs, receiveMessages, receiveTextValue } from '../../redux/selectors/dialogs-selectors';

class DialogsContainer extends React.Component {    
    render() {        
        return (
            <Dialogs {...this.props}/>
        );
    }
}

const mapStateToProps = state => {    
    return {
        dialogs: receiveDialogs(state),
        messages: receiveMessages(state),
        textValue: receiveTextValue(state)
    };
}

export default compose( connect( mapStateToProps, { addPost } ),
                        withConnectedAuthRedirect )( DialogsContainer );
