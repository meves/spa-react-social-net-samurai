import { NameType } from "../../components/types/types";
import { AppStateType } from "../redux-store";

export const receiveNames = (state: AppStateType): Array<NameType> => state.sidebar.names;
