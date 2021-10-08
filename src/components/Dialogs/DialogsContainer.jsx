import React from 'react';
import Dialogs from "./Dialogs";
import { addPost } from "../../redux/dialog-reducer";
import { connect } from 'react-redux';
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class DialogsContainer extends React.Component {    
    render() {        
        return (
            <Dialogs {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => {    
    return {
        dialogs: state.dialogPage.dialogs,
        messages: state.dialogPage.messages,
        textValue: state.dialogPage.textValue
    };
}

export default compose(connect(mapStateToProps, { addPost }), withConnectedAuthRedirect)(DialogsContainer);
