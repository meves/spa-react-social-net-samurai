import { authAPI } from '../api/api';
import { securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'my-app/auth/SET_AUTH_USER_DATA';
const SET_OWNER_PHOTO = 'my-app/auth/SET_OWNER_PHOTO';
const SHOW_FULL_NAME = 'my-app/auth/SHOW_FULL_NAME';
const SET_CAPTCHA_URL = 'my-app/auth/SET_CAPTCHA_URL';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    photo: null,
    isFetching: false,
    captchaUrl: null        
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case SET_OWNER_PHOTO:
            return {
                ...state,
                photo: action.photo
            };
        case SHOW_FULL_NAME:
            return {
                ...state,
                isFetching: action.isFetching
            }
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
export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_AUTH_USER_DATA,
        payload: { userId, email, login, isAuth }
    }
}

export const setOwnerPhoto = (photo) => {
    return {
        type: SET_OWNER_PHOTO,
        photo
    };
}

export const showFullName = (isFetching) => {
    return {
        type: SHOW_FULL_NAME,
        isFetching
    };
}

export const setCaptchaUrl = (captchaUrl) => {
    return {
        type: SET_CAPTCHA_URL,
        captchaUrl
    };
}

// thunk creators
export const getAuthMe = () => async (dispatch) => {
    const data = await authAPI.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        return dispatch(setAuthUserData(id, email, login, true));                    
    }    
}

export const loginUser = (email, password, rememberMe, captcha) => async (dispatch) => {
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

export const getCaptchaUrl = () => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(setCaptchaUrl(captchaUrl));
}

export const logoutUser = () => async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }        
};

export default authReducer;
