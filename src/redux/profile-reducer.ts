import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/api";
import { ResponseDataEmptyType } from "../types/apiTypes";
import { PostType, PhotosType, ProfileType } from "../types/types";
import { AppStateType } from "./redux-store";

const ADD_POST = 'my-app/profile/ADD-POST';
const SET_USER_PROFILE = 'my-app/profile/SET_USER_PROFILE';
const SET_STATUS = 'my-app/profile/SET_STATUS';
const DELETE_POST = 'my-app/profile/DELETE_POST';
const SAVE_PROFILE_PHOTO = 'my-app/profile/SAVE_PROFILE_PHOTO';

const initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 10},
        {id: 2, message: "It's myfirst post", likesCount: 5}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};
type InitialStateType = typeof initialState;

const profileReducer = (state=initialState, action: ActionsTypes): InitialStateType => {
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
                } as ProfileType
            };
        default:
            return state;    
    }
};

type ActionsTypes = AddPostActionType | SetUserProfileActionType | SetStatusActionType 
    | DeletePostActionType | SetProfilePhotoActionType;

// action creators
type AddPostActionType = {
    type: typeof ADD_POST
    newPost: string
}
export const addPost = (newPost: string): AddPostActionType => ({ 
    type: ADD_POST, newPost });

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}    
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
        type: SET_USER_PROFILE,
        profile
})

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => {
    return {
        type: SET_STATUS,
        status
    };
}

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => {
    return {
        type: DELETE_POST,
        postId
    };
}

type SetProfilePhotoActionType = {
    type: typeof SAVE_PROFILE_PHOTO
    photos: PhotosType
}
export const setProfilePhoto = (photos: PhotosType): SetProfilePhotoActionType => {
    return {
        type: SAVE_PROFILE_PHOTO,
        photos
    };
}

// thunk creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUserProfile = (userId: number): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfile(data));
    }


export const getStatus = (userId: number): ThunkType => 
    async (dispatch) => {
        const status: string = await profileAPI.getStatus(userId);
        dispatch(setStatus(status));        
    }


export const updateStatus = (status: string): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataEmptyType = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }       
    }

export const savePhoto = (photoFile: any): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.putPhoto(photoFile);
        if (data.resultCode === 0) {
            dispatch(setProfilePhoto(data.data.photos));
        }
    }

type SaveUserProfileThunkType = ThunkAction<Promise<void|string>, AppStateType, unknown, ActionsTypes | FormAction>;    
type GetStateType = () => AppStateType;

export const saveUserProfile = (profile: ProfileType): SaveUserProfileThunkType => 
    async (dispatch, getState: GetStateType) => {
        const data: ResponseDataEmptyType = await profileAPI.putProfile(profile);
        if (data.resultCode === 0) {
            dispatch(getUserProfile(profile.userId));
        } else {
            dispatch(stopSubmit('ProfileForm', {_error: data.messages[0]}));
            return Promise.reject(data.messages[0]);
        }  
    }

export default profileReducer;
