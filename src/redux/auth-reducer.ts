import { authAPI } from '../api/api';
import { securityAPI } from '../api/api';
import { FormAction, stopSubmit } from 'redux-form';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { ResultCode, ResultCodeForCaptcha } from '../enums/resultCodes';
import { AuthMeDataType, LoginDataType, ResponseDataGetCaptchaUrl, ResponseDataType } from '../api/apiTypes';
import { ActionsTypes } from './redux-store';

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null        
};

export type InitialStateType = typeof initialState;

const authReducer = (state=initialState, action: ActionsTypes<ActionType>): InitialStateType => {
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

// action
const actionCreators = {
    setAuthUserData (userId: number|null, email: string|null, login: string|null, isAuth: boolean) {
        return { type: 'my-app/auth/SET_AUTH_USER_DATA', payload: { userId, email, login, isAuth } } as const
    }, 
    setCaptchaUrl (captchaUrl: string) {
        return { type: 'my-app/auth/SET_CAPTCHA_URL', captchaUrl } as const
    }
};
type ActionType = typeof actionCreators;


// thunk creators
type GetAuthmeThunkType = ThunkAction<Promise<void | ActionsTypes<ActionType>>, AppStateType, unknown, ActionsTypes<ActionType>>;

export const getAuthMe = (): GetAuthmeThunkType => 
    async (dispatch) => {
        const data: ResponseDataType<AuthMeDataType> = await authAPI.authMe();
        if (data.resultCode === ResultCode.Success) {
            let {id, email, login} = data.data;
            return dispatch(actionCreators.setAuthUserData(id, email, login, true));                    
        }    
    }

type LoginUserThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType> | FormAction>;

export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined): LoginUserThunkType => 
    async (dispatch) => {
        const data: ResponseDataType<LoginDataType> = await authAPI.login(email, password, rememberMe, captcha);
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

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType>>;

export const getCaptchaUrl = (): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataGetCaptchaUrl = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;
        dispatch(actionCreators.setCaptchaUrl(captchaUrl));
    }

export const logoutUser = (): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataType<{}> = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(actionCreators.setAuthUserData(null, null, null, false));
        }        
    };

export default authReducer;
