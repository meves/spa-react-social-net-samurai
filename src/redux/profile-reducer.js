import { usersAPI, profileAPI } from "../api/api";
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

const initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 10},
        {id: 2, message: "It's myfirst post", likesCount: 5}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: ''
};

const profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const message = state.newPostText;
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 3, message, likesCount: 0}]
            };                        
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        case SET_USER_PROFILE: 
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status    
            };
        default:
            return state;    
    }
};

// action creators
export const addPost = () => ({ type: ADD_POST });

export const postChange = (text) => ({
    type: UPDATE_NEW_POST_TEXT, newText: text
});

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    };
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    };
}

// thunk creators
export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getUserProfile(userId)
            .then(data => dispatch(setUserProfile(data)));
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(status => {
            dispatch(setStatus(status));
        });
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(data => {
            if(data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
    }
}

export default profileReducer;
