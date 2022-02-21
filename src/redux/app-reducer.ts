import { getAuthMe } from "./auth-reducer";
import { BaseThunkType } from "./redux-store";
import { InferActionsTypes } from "./redux-store";

const initialState = {
    initialized: false
};
export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
const actions = {
    initializedSuccess () {
        return { type: "my-app/app/INITIALIZED_SUCCESS" } as const}
}

// thunk
type ThunkType = BaseThunkType<ActionsTypes>;

export const initializeApp = (): ThunkType => 
    async (dispatch) => {
        const promises = [];
        promises.push(dispatch(getAuthMe()));
        await Promise.all(promises);
        dispatch(actions.initializedSuccess());
    }
