import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = 'my-app/profile/ADD-POST';
const SET_USER_PROFILE = 'my-app/profile/SET_USER_PROFILE';
const SET_STATUS = 'my-app/profile/SET_STATUS';
const DELETE_POST = 'my-app/profile/DELETE_POST';
const SAVE_PROFILE_PHOTO = 'my-app/profile/SAVE_PROFILE_PHOTO';

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
        case DELETE_POST:
            return {
                ...state, 
                posts: state.posts.filter(post => post.id !== action.postId)
            };
        case SAVE_PROFILE_PHOTO:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
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

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    };
}

export const setProfilePhoto = (photos) => {
    return {
        type: SAVE_PROFILE_PHOTO,
        photos
    };
}

// thunk creators
export const getUserProfile = (userId) => async (dispatch) => {
    const data = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(data));
}


export const getStatus = (userId) => async (dispatch) => {
    const status = await profileAPI.getStatus(userId);
    dispatch(setStatus(status));        
}


export const updateStatus = (status) => async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }       
}

export const savePhoto = (photoFile) => async (dispatch) => {
    const data = await profileAPI.putPhoto(photoFile);
    if (data.resultCode === 0) {
        dispatch(setProfilePhoto(data.data.photos));
    }
}

export const saveUserProfile = (profile) => async (dispatch, getState) => {
    const data = await profileAPI.putProfile(profile);
    if (data.resultCode === 0) {
        const userId = getState().auth.userId;
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('ProfileForm', {_error: data.messages[0]}));
        return Promise.reject(data.messages[0]);
    }  
}

export default profileReducer;
