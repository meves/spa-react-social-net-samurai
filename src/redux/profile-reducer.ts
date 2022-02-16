import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/api";
import { ProfilePhotoDataType, ResponseDataType } from "../api/apiTypes";
import { PostType, PhotosType, ProfileType } from "../components/types/types";
import { AppStateType } from "./redux-store";
import { ActionsTypes } from "./redux-store";

const initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 10},
        {id: 2, message: "It's myfirst post", likesCount: 5}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};
type InitialStateType = typeof initialState;

const profileReducer = (state=initialState, action: ActionsTypes<ActionType>): InitialStateType => {
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
export const actionCreators = {
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
type ActionType = typeof actionCreators;

// thunk creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType>>;

export const getUserProfile = (userId: number): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.getUserProfile(userId)
        dispatch(actionCreators.setUserProfile(data));
    }


export const getStatus = (userId: number): ThunkType => 
    async (dispatch) => {
        const status: string = await profileAPI.getStatus(userId);
        dispatch(actionCreators.setStatus(status));        
    }


export const updateStatus = (status: string): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataType<{}> = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actionCreators.setStatus(status));
        }       
    }

export const savePhoto = (photoFile: any): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataType<ProfilePhotoDataType> = await profileAPI.putPhoto(photoFile);
        if (data.resultCode === 0) {
            dispatch(actionCreators.setProfilePhoto(data.data.photos));
        }
    }

type SaveUserProfileThunkType = ThunkAction<Promise<void|string>, AppStateType, unknown, ActionsTypes<ActionType> | FormAction>;    

export const saveUserProfile = (profile: ProfileType): SaveUserProfileThunkType => 
    async (dispatch) => {
        const data: ResponseDataType<{}> = await profileAPI.putProfile(profile);
        if (data.resultCode === 0) {
            dispatch(getUserProfile(Number(profile.userId)));            
        } else {
            dispatch(stopSubmit('ProfileForm', {_error: data.messages[0]}));
            return Promise.reject(data.messages[0]);
        }  
    }

export default profileReducer;
