import { getAuthMe } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'my-app/app/INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}
const initialState: InitialStateType = {
    initialized: false
};

export const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
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

// actions
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
// action creators
export const initializedSuccess = (): InitializedSuccessActionType => ({ 
    type: INITIALIZED_SUCCESS
})

// thunk creators
export const initializeApp = () => async (dispatch: any) => {
    const promises = [];
    promises.push(dispatch(getAuthMe()));
    await Promise.all(promises);
    dispatch(initializedSuccess());
}
