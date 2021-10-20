import { authAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'my-app/auth/SET_AUTH_USER_DATA';
const SET_OWNER_PHOTO = 'my-app/auth/SET_OWNER_PHOTO';
const SHOW_FULL_NAME = 'my-app/auth/SHOW_FULL_NAME';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,

    photo: null,
    isFetching: false        
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

// thunk creators
export const getAuthMe = () => async (dispatch) => {
    const data = await authAPI.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        return dispatch(setAuthUserData(id, email, login, true));                    
    }    
}


export const loginUser = (email, password, rememberMe) => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        dispatch(getAuthMe());
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Login or Password is wrong';
        dispatch(stopSubmit('login', {_error: message}));
    }       
}


export const logoutUser = () => async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }        
};

export default authReducer;
