import { ThunkAction } from "redux-thunk";
import { getAuthMe } from "./auth-reducer";
import { AppStateType } from "./redux-store";
import { ActionsTypes } from "./redux-store";

export type InitialStateType = {
    initialized: boolean
}
const initialState: InitialStateType = {
    initialized: false
};

export const appReducer = (state = initialState, action: ActionsTypes<ActionType>): InitialStateType => {
    switch (action.type) {
        case "my-app/app/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true                
            };
        default:
            return state;
    }
}

// action
const actionCreators = {
    initializedSuccess () {
        return { type: "my-app/app/INITIALIZED_SUCCESS" } as const}
}
type ActionType = typeof actionCreators;

// thunk
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType>>;

export const initializeApp = (): ThunkType => 
    async (dispatch) => {
        const promises = [];
        promises.push(dispatch(getAuthMe()));
        await Promise.all(promises);
        dispatch(actionCreators.initializedSuccess());
    }
