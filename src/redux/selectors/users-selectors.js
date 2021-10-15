import { createSelector } from "reselect";

const receiveUsers = state => state.userPage.users;
export const receiveCustomUsers = createSelector(receiveUsers, users => users.map(u => u));

export const receivePageSize = state => state.userPage.pageSize;
export const receiveTotalUsersCount = state => state.userPage.totalUsersCount;
export const receiveFollowingProgress = state => state.userPage.followingProgress;

export const receiveCurrentPage = state => state.userPage.currentPage;
export const receiveIsFetching = state => state.userPage.isFetching;
