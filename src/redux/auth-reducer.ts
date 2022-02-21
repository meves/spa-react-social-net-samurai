import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';
import { FormAction, stopSubmit } from 'redux-form';
import { BaseThunkType } from './redux-store';
import { ResultCode, ResultCodeForCaptcha } from '../api/enums';
import { InferActionsTypes } from './redux-store';

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null        
};
export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

const authReducer = (state=initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'my-app/auth/SET_AUTH_USER_DATA':
            return {
                ...state,
                ...action.payload,
            };
        case 'my-app/auth/SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        default:
            return state;
    }    
}

const actions = {
    setAuthUserData (userId: number|null, email: string|null, login: string|null, isAuth: boolean) {
        return { type: 'my-app/auth/SET_AUTH_USER_DATA', payload: { userId, email, login, isAuth } } as const
    }, 
    setCaptchaUrl (captchaUrl: string) {
        return { type: 'my-app/auth/SET_CAPTCHA_URL', captchaUrl } as const
    }
};

type ThunkType = BaseThunkType<ActionsTypes | FormAction, Promise<void | ActionsTypes>>;

export const getAuthMe = (): ThunkType => 
    async (dispatch) => {
        const data = await authAPI.authMe();
        if (data.resultCode === ResultCode.Success) {
            let {id, email, login} = data.data;
            return dispatch(actions.setAuthUserData(id, email, login, true));                    
        }    
    }

export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined): ThunkType => 
    async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha);
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

export const getCaptchaUrl = (): ThunkType => 
    async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;
        dispatch(actions.setCaptchaUrl(captchaUrl));
    }

export const logoutUser = (): ThunkType => 
    async (dispatch) => {
        const data = await authAPI.logout();
        if (data.resultCode === ResultCode.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }        
    };

export default authReducer;
