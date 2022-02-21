import { FormAction, stopSubmit } from "redux-form";
import { ResultCode } from "../api/enums";
import { profileAPI } from "../api/profile-api";
import { PostType, PhotosType, ProfileType } from "../components/types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

export const initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 10},
        {id: 2, message: "It's myfirst post", likesCount: 5}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};
type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

const profileReducer = (state=initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "my-app/profile/ADD-POST": {
            const message = action.newPost;
            return {
                ...state,
                posts: [...state.posts, {id: 3, message, likesCount: 0}]
            };                        
        }        
        case "my-app/profile/SET_USER_PROFILE": 
            return {
                ...state,
                profile: action.profile
            }
        case "my-app/profile/SET_STATUS":
            return {
                ...state,
                status: action.status    
            };
        case "my-app/profile/DELETE_POST":
            return {
                ...state, 
                posts: state.posts.filter(post => post.id !== action.postId)
            };
        case "my-app/profile/SAVE_PROFILE_PHOTO":
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

// action creators
export const actions = {
    addPost: (newPost: string) => ({ 
        type: 'my-app/profile/ADD-POST', newPost 
    } as const ),
    setUserProfile: (profile: ProfileType) => ({
        type: 'my-app/profile/SET_USER_PROFILE', profile
    } as const),
    setStatus: (status: string) => ({
            type: 'my-app/profile/SET_STATUS', status
    } as const),
    deletePost: (postId: number) => ({
        type: 'my-app/profile/DELETE_POST', postId        
    } as const),
    setProfilePhoto: (photos: PhotosType) => ({
        type: 'my-app/profile/SAVE_PROFILE_PHOTO', photos        
    } as const)
}

// thunk creators
type ThunkType = BaseThunkType<ActionsTypes | FormAction, Promise<void | string>>;

export const getUserProfile = (userId: number): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.getUserProfile(userId)
        dispatch(actions.setUserProfile(data));
    }


export const getStatus = (userId: number): ThunkType => 
    async (dispatch) => {
        const status: string = await profileAPI.getStatus(userId);
        dispatch(actions.setStatus(status));        
    }


export const updateStatus = (status: string): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === ResultCode.Success) {
            dispatch(actions.setStatus(status));
        }       
    }

export const savePhoto = (photoFile: File): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.putPhoto(photoFile);
        if (data.resultCode === ResultCode.Success) {
            dispatch(actions.setProfilePhoto(data.data.photos));
        }
    }

export const saveUserProfile = (profile: ProfileType): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.putProfile(profile);
        if (data.resultCode === ResultCode.Success) {
            if (profile.userId) {
                dispatch(getUserProfile(profile.userId));            
            } else {
                throw new Error(`UserId can't be undefined`);
            }
        } else {
            dispatch(stopSubmit('ProfileForm', {_error: data.messages[0]}));
            return Promise.reject(data.messages[0]);
        }  
    }

export default profileReducer;
