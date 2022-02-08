import { PostType, ProfileType } from "../../types/types";
import { AppStateType } from "../redux-store";

export const receivePosts = (state: AppStateType): Array<PostType> => state.profilePage.posts;
export const receiveProfile = (state: AppStateType): ProfileType | null => state.profilePage.profile;
export const receiveStatus = (state: AppStateType): string => state.profilePage.status;
