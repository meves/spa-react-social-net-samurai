import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { ResponseDataGetUsersType, ResponseDataEmptyType } from "../types/apiTypes";
import { UserType } from "../types/types"; 
import { AppStateType } from "./redux-store";

const FOLLOW = 'my-app/user/FOLLOW';
const UNFOLLOW = 'my-app/user/UNFOLLOW';
const SET_USERS = 'my-app/user/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/user/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/user/SET_TOTAL_USERS_COUNT';
const TOGGLE_PRELOADER = 'my-app/user/TOGGLE_PRELOADER';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'my-app/user/TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,   
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as Array<number>
}

type InitialStateType = typeof initialState;

// reducer
const userReducer = (state=initialState, action: ActionsTypes): InitialStateType => {    
    switch(action.type) {
        case FOLLOW:             
                return {
                    ...state,
                    users: state.users.map(user => {
                        if (user.id === action.userId) {
                            return {
                                ...user,
                                followed: true
                            };
                        }
                        return user;
                    })
                };       
        case UNFOLLOW: 
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: false
                        };
                    }
                    return user;
                })
            };   
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };  
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }  
        case SET_TOTAL_USERS_COUNT: 
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case TOGGLE_PRELOADER:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFetching ? 
                                        [...state.followingProgress, action.userId]
                                        : state.followingProgress.filter(id => id !== action.userId) 

            };
        default: 
            return state;
    }
}

// action-creators
type ActionsTypes = FollowUserActionType | UnfollowUserActionType | SetUsersActionType | SetCurrentPageActionType
    | SetTotalUsersCountActionType | SetIsFetchingActionType | ToggleFollowingProgressActionType;

type FollowUserActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followUser = (userId: number): FollowUserActionType => ({
    type: FOLLOW,
    userId
})

type UnfollowUserActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowUser = (userId: number): UnfollowUserActionType => ({
    type: UNFOLLOW,
    userId
})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType =>  ({
    type: SET_USERS,
    users
})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType =>  ({
    type: SET_CURRENT_PAGE,
    currentPage
})

type SetTotalUsersCountActionType ={
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
})

type SetIsFetchingActionType = {
    type: typeof TOGGLE_PRELOADER
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({
    type: TOGGLE_PRELOADER,
    isFetching
})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

// thunk creators
//type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUsers = (pageSize: number, currentPage: number): ThunkType => 
    async (dispatch) => 
    {
        dispatch(setIsFetching(true));
        const data: ResponseDataGetUsersType = await usersAPI.getUsers(pageSize, currentPage);
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));    
    }

export const getCurrentPageUsers = (pageSize: number, pageNumber: number): ThunkType => 
    async (dispatch) => 
    {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(pageNumber));
        const data: ResponseDataGetUsersType = await usersAPI.getUsers(pageSize, pageNumber);
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));    
    }

type ActionCreatorType = (userId: number) => UnfollowUserActionType | FollowUserActionType  
type followUnfollowType = (userId: number) => Promise<ResponseDataEmptyType>;
const _followUnfollow = async (dispatch: DispatchType, userId: number, methodAPI: followUnfollowType, actionCreator: ActionCreatorType)
: Promise<void> => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await methodAPI(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));    
}

export const unfollow = (userId: number): ThunkType => 
    async (dispatch) => 
    {
        _followUnfollow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollowUser);       
    }

export const follow = (userId: number): ThunkType => 
    async (dispatch) => 
    {
        _followUnfollow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followUser);      
    }

export default userReducer;
