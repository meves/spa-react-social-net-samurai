import Dialogs from "./Dialogs";
import { addTextValueActionCreator, addTextPostActionCreator } from "../../redux/dialog-reducer";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogPage.dialogs,
        messages: state.dialogPage.messages,
        textValue: state.dialogPage.textValue
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost() {
            dispatch(addTextPostActionCreator());
        },
        changeHandler(text) {
            dispatch(addTextValueActionCreator(text));
        }
    };
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
