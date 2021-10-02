import React from 'react';
import Dialogs from "./Dialogs";
import { addPost, changeHandler } from "../../redux/dialog-reducer";
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

//const ConnectedAuthRedirectComponent = withConnectedAuthRedirect(DialogsContainer);

const mapStateToProps = (state) => {    
    return {
        dialogs: state.dialogPage.dialogs,
        messages: state.dialogPage.messages,
        textValue: state.dialogPage.textValue
    };
}

//export default connect(mapStateToProps, { addPost, changeHandler })(ConnectedAuthRedirectComponent);

export default compose(connect(mapStateToProps, { addPost, changeHandler }), 
                               withConnectedAuthRedirect)(DialogsContainer);
