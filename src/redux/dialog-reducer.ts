import { DialogType, MessageType } from "../components/types/types";
import { ActionsTypes } from "./redux-store";

const initialState = {
    dialogs: [
        { id: 1, name: "Sergey" },
        { id: 2, name: "Andrey" },
        { id: 3, name: "Irina" },
        { id: 4, name: "Victor" },
        { id: 5, name: "Alexandr" },
        { id: 6, name: "Egeny" }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: "Hello, friends!" },
        { id: 2, message: "Hi everybody!" },
        { id: 3, message: "Good day!" },
        { id: 4, message: "How are you?" },
        { id: 5, message: "Hi!" },
        { id: 6, message: "How do you do?" }
    ] as Array<MessageType>
};

export type InitialStateType = typeof initialState;

const dialogReducer  = (state = initialState, action: ActionsTypes<ActionType>): InitialStateType => {
    switch (action.type) {
        case "my-app/dialog/ADD-TEXT-POST": {
            const id: number = state.messages ? state.messages.length : 0;  
            const message: string = action.newMessage;          
            return {
                ...state,
                messages: [...state.messages, {id, message}]    
            };
        }
        default: 
            return state;
    }    
};

// action
export const actionCreators = {
    addPost: (newMessage: string) => ({
        type: 'my-app/dialog/ADD-TEXT-POST', newMessage
    } as const)
}
type ActionType = typeof actionCreators;

export default dialogReducer;
