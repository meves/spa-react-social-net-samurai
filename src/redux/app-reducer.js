import { getAuthMe } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'my-app/app/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false,
    globalError: null
};

export const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

// action creators
export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    };
}

// thunk creators
export const initializeApp = () => async dispatch => {
    const promises = [];
    promises.push(dispatch(getAuthMe()));
    await Promise.all(promises);
    dispatch(initializedSuccess());
}
