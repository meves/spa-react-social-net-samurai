import Dialogs from "./Dialogs";
import { addPost, changeHandler } from "../../redux/dialog-reducer";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogPage.dialogs,
        messages: state.dialogPage.messages,
        textValue: state.dialogPage.textValue
    };
}

const DialogsContainer = connect(mapStateToProps, {
    addPost, changeHandler
})(Dialogs);

export default DialogsContainer;
