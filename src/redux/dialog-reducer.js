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
    ]
};

const dialogReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TEXT_POST: {
            const lastIndex = state.messages.length - 1;
            const id = state.messages[lastIndex].id + 1;  
            const message = action.newMessage;          
            return {
                ...state,
                messages: [...state.messages, {id, message}]    
            };
        }
        default: 
            return state;
    }    
};

export const addPost = (newMessage) => ({
    type: ADD_TEXT_POST,
    newMessage
});

export default dialogReducer;
