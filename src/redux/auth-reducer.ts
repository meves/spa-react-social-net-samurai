import { authAPI } from '../api/api';
import { securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

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

const authReducer = (state=initialState, action: any): InitialStateType => {
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

// action creators
type SetAuthUserDataActionPayloadType = { userId:number|null, email:string|null, login:string|null, isAuth:boolean }

type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId:number|null, email:string|null, login:string|null, isAuth:boolean)
    : SetAuthUserDataActionType => ({
            type: SET_AUTH_USER_DATA,
            payload: { userId, email, login, isAuth }
    })


type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string
}    
export const setCaptchaUrl = (captchaUrl: string)
    :SetCaptchaUrlActionType => ({
            type: SET_CAPTCHA_URL,
            captchaUrl
    })

// thunk creators
export const getAuthMe = () => async (dispatch: any) => {
    const data = await authAPI.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        return dispatch(setAuthUserData(id, email, login, true));                    
    }    
}

export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined) => 
async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(getAuthMe());
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Login or Password is wrong';
        dispatch(stopSubmit('login', {_error: message}));
    }       
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(setCaptchaUrl(captchaUrl));
}

export const logoutUser = () => async (dispatch: any) => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }        
};

export default authReducer;
