import { AppStateType } from "../redux-store";
import { DialogType, MessageType } from "../../types/types";

export const receiveDialogs = (state: AppStateType): Array<DialogType> => state.dialogPage.dialogs;
export const receiveMessages = (state: AppStateType): Array<MessageType> => state.dialogPage.messages;
