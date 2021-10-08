import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

const initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 10},
        {id: 2, message: "It's myfirst post", likesCount: 5}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const message = action.newPost;
            return {
                ...state,
                posts: [...state.posts, {id: 3, message, likesCount: 0}]
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
export const addPost = (newPost) => ({ 
    type: ADD_POST, newPost });

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
        profileAPI.getUserProfile(userId)
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
