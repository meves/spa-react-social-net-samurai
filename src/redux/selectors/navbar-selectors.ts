import { MenuItemType, NameType } from "../../types/types";
import { AppStateType } from "../redux-store";

export const receiveMenuItems = (state: AppStateType): Array<MenuItemType> => state.sidebar.menuItems;
export const receiveNames = (state: AppStateType): Array<NameType> => state.sidebar.names;
