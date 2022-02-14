import { createSelector } from "reselect";
import { AppStateType } from "../redux-store";
import { UserType } from "../../types/types";

const receiveUsers = (state: AppStateType): Array<UserType>  => state.userPage.users;
export const receiveCustomUsers = createSelector(receiveUsers, (users: Array<UserType>): Array<UserType> => users.map((u: UserType) => u));

export const receivePageSize = (state: AppStateType): number => state.userPage.pageSize;
export const receiveTotalUsersCount = (state: AppStateType): number => state.userPage.totalUsersCount;
export const receiveFollowingProgress = (state: AppStateType): Array<number> => state.userPage.followingProgress;

export const receiveCurrentPage = (state: AppStateType): number => state.userPage.currentPage;
export const receiveIsFetching = (state: AppStateType): boolean => state.userPage.isFetching;