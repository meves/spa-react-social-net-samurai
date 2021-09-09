const ADD_TEXT_VALUE = 'ADD-TEXT-VALUE';
const ADD_TEXT_POST = 'ADD-TEXT-POST';

const dialogReducer = (state, action) => {
    switch (action.type) {
        case ADD_TEXT_VALUE: 
            state.textValue = action.text;
            return state;
        case ADD_TEXT_POST:
            const lastIndex = state.messages.length - 1;
            const id = state.messages[lastIndex].id + 1;
            const newMessage = {
                id : id,
                message: state.textValue
            };
            state.messages.push(newMessage);
            state.textValue = '';
            return state;
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
