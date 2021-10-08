import { getAuthMe } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
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
export const initializeApp = () => (dispatch) => {
    const promises = [];
    promises.push(dispatch(getAuthMe()));
    Promise.all(promises).then(() => {
        dispatch(initializedSuccess());
    });
}
