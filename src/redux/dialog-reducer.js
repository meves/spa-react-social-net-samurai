const ADD_TEXT_VALUE = 'ADD-TEXT-VALUE';
const ADD_TEXT_POST = 'ADD-TEXT-POST';

const initialState = {
    dialogs: [
        { id: 1, name: "Sergey" },
        { id: 2, name: "Andrey" },
        { id: 3, name: "Irina" },
        { id: 4, name: "Victor" },
        { id: 5, name: "Alexandr" },
        { id: 6, name: "Egeny" }
    ],
    messages: [
        { id: 1, message: "Hello, friends!" },
        { id: 2, message: "Hi everybody!" },
        { id: 3, message: "Good day!" },
        { id: 4, message: "How are you?" },
        { id: 5, message: "Hi!" },
        { id: 6, message: "How do you do?" }
    ],
    textValue: ''
};

const dialogReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TEXT_VALUE: {
            return {
                ...state,
                textValue: action.text
            };
        }
        case ADD_TEXT_POST: {
            const lastIndex = state.messages.length - 1;
            const id = state.messages[lastIndex].id + 1;  
            const message = state.textValue;          
            return {
                ...state,
                textValue: '',
                messages: [...state.messages, {id, message}]    
            };
        }
        default: 
            return state;
    }    
};

export const addTextValueActionCreator = (text) => ({ 
    type: ADD_TEXT_VALUE, text: text 
});

export const addTextPostActionCreator = () => ({
    type: ADD_TEXT_POST
});

export default dialogReducer;
