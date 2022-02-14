import { authAPI } from '../api/api';
import { securityAPI } from '../api/api';
import { FormAction, stopSubmit } from 'redux-form';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { ResultCode, ResultCodeForCaptcha } from '../enums/resultCodes';
import { ResponseDataAuthMeType, ResponseDataAuthLoginType, ResponseDataEmptyType, ResponseDataGetCaptchaUrl } from '../types/apiTypes';

const SET_AUTH_USER_DATA = 'my-app/auth/SET_AUTH_USER_DATA';
const SET_CAPTCHA_URL = 'my-app/auth/SET_CAPTCHA_URL';

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null        
};

export type InitialStateType = typeof initialState;

const authReducer = (state=initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        default:
            return state;
    }    
}

type ActionsTypes = SetAuthUserDataActionType | SetCaptchaUrlActionType; 

// action creators
type SetAuthUserDataActionPayloadType = { 
    userId: number | null 
    email: string | null
    login: string | null
    isAuth: boolean 
}
type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId:number|null, email:string|null, login:string|null, isAuth:boolean): SetAuthUserDataActionType => 
    ({
        type: SET_AUTH_USER_DATA,
        payload: { userId, email, login, isAuth }
    })

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string
}    
export const setCaptchaUrl = (captchaUrl: string):SetCaptchaUrlActionType => 
    ({
            type: SET_CAPTCHA_URL,
            captchaUrl
    })

// thunk creators
type GetAuthmeThunkType = ThunkAction<Promise<void | SetAuthUserDataActionType>, AppStateType, unknown, ActionsTypes>;

export const getAuthMe = (): GetAuthmeThunkType => 
    async (dispatch) => {
        const data: ResponseDataAuthMeType = await authAPI.authMe();
        if (data.resultCode === ResultCode.Success) {
            let {id, email, login} = data.data;
            return dispatch(setAuthUserData(id, email, login, true));                    
        }    
    }

type LoginUserThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | FormAction>;

export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined): LoginUserThunkType => 
    async (dispatch) => {
        const data: ResponseDataAuthLoginType = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCode.Success) {
            dispatch(getAuthMe());
        } else {
            if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let message: string = data.messages.length > 0 ? data.messages[0] : 'Login or Password is wrong';
            dispatch(stopSubmit('login', {_error: message}));
        }       
    }

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getCaptchaUrl = (): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataGetCaptchaUrl = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;
        dispatch(setCaptchaUrl(captchaUrl));
    }

export const logoutUser = (): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataEmptyType = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }        
    };

export default authReducer;
