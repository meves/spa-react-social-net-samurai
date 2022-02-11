import { DialogType, MessageType } from "../types/types";

const ADD_TEXT_POST = 'my-app/dialog/ADD-TEXT-POST';

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

const dialogReducer  = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_TEXT_POST: {
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

type ActionsTypes = AddPostActionType;

// actions
type AddPostActionType = {
    type: typeof ADD_TEXT_POST,
    newMessage: string
}

// action-creators
export const addPost = (newMessage: string): AddPostActionType => ({
    type: ADD_TEXT_POST,
    newMessage
});

export default dialogReducer;
