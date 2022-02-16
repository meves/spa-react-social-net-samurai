import { NameType } from "../components/types/types";

const initialState = {    
    names: [
        { id: 1, name: "Andrew" },
        { id: 2, name: "Sasha" },
        { id: 3, name: "Sveta" }
    ] as Array<NameType>
}
type InitialStateType = typeof initialState

const sidebarReducer = (state=initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state;
    }        
};

export default sidebarReducer;
