import { ThunkAction } from "redux-thunk";
import { getAuthMe } from "./auth-reducer";
import { AppStateType } from "./redux-store";

const INITIALIZED_SUCCESS = 'my-app/app/INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}
const initialState: InitialStateType = {
    initialized: false
};

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = InitializedSuccessActionType;

// actions
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
// action creators
export const initializedSuccess = (): InitializedSuccessActionType => ({ 
    type: INITIALIZED_SUCCESS
})

// thunk creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkType => 
    async (dispatch) => {
        const promises = [];
        promises.push(dispatch(getAuthMe()));
        await Promise.all(promises);
        dispatch(initializedSuccess());
    }
