const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_OWNER_PHOTO = 'SET_OWNER_PHOTO';
const SHOW_FULL_NAME = 'SHOW_FULL_NAME';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    photo: null,
    isFetching: true        
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
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

export const setAuthUserData = (userId, email, login) => {
    return {
        type: SET_AUTH_USER_DATA,
        data: { userId, email, login }
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

export default authReducer;
