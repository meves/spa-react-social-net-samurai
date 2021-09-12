import Dialogs from "./Dialogs";
import { addTextValueActionCreator, addTextPostActionCreator } from "../../redux/dialog-reducer";
import StoreContext from "../../StoreContext";

const DialogsContainer = (props) => {    
    return (
        <StoreContext.Consumer> 
            {(store) => {
                const state = store.getState();
                const changeHandler = (text) => {
                    store.dispatch(addTextValueActionCreator(text));
                }
                const addPost = () => {
                    store.dispatch(addTextPostActionCreator());
                }
                return <Dialogs dialogs={state.dialogPage.dialogs}
                            messages={state.dialogPage.messages}
                            textValue={state.dialogPage.textValue}
                            changeHandler={changeHandler}
                            addPost={addPost}/>
            }}        
        </StoreContext.Consumer>
    );
}

export default DialogsContainer;
