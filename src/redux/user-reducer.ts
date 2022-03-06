import { Dispatch } from "redux";
import { usersAPI } from "../api/users-api";
import { UserType } from "../components/types/types"; 
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { ResultCode } from "../api/enums";
import { APIResponseType } from "../api/types";

export const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,   
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as Array<number>,
    filter: {
        term: "",
        friend: null as null | boolean
    }
}
export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

type ActionsTypes = InferActionsTypes<typeof actions>;

const userReducer = (state=initialState, action: ActionsTypes): InitialStateType => {    
    switch(action.type) {
        case "my-app/user/FOLLOW":             
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
        case "my-app/user/UNFOLLOW": 
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
        case "my-app/user/SET_USERS":
            return {
                ...state,
                users: action.users
            };  
        case "my-app/user/SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }  
        case "my-app/user/SET_TOTAL_USERS_COUNT": 
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case "my-app/user/TOGGLE_PRELOADER":
            return {
                ...state,
                isFetching: action.isFetching
            };
        case "my-app/user/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingProgress: action.isFetching ? 
                                        [...state.followingProgress, action.userId]
                                        : state.followingProgress.filter(id => id !== action.userId) 

            };
        case "my-app/user/SET_FILTER":
            return {
                ...state,
                filter: action.payload.filter
            }
        default: 
            return state;
    }
}

export const actions = {
    followUser: (userId: number) => ({
        type: 'my-app/user/FOLLOW', userId
    } as const),
    unfollowUser: (userId: number) => ({
        type: 'my-app/user/UNFOLLOW', userId
    } as const),
    setUsers: (users: Array<UserType>) =>  ({
        type: 'my-app/user/SET_USERS', users
    } as const),
    setCurrentPage: (currentPage: number) =>  ({
        type: 'my-app/user/SET_CURRENT_PAGE', currentPage
    } as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: 'my-app/user/SET_TOTAL_USERS_COUNT', totalCount
    } as const),
    setIsFetching: (isFetching: boolean) => ({
        type: 'my-app/user/TOGGLE_PRELOADER', isFetching
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'my-app/user/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId
    } as const),
    setFilter: (filter: FilterType) => ({
        type: 'my-app/user/SET_FILTER', payload: {filter}
    } as const)
}

// thunk creators
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;

export const getUsers = (pageSize: number, currentPage: number): ThunkType => 
    async (dispatch) => 
    {
        dispatch(actions.setIsFetching(true));
        const data = await usersAPI.getUsers(pageSize, currentPage);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));    
    }

export const getCurrentPageUsers = (pageSize: number, pageNumber: number, filter: FilterType): ThunkType => 
    async (dispatch) => 
    {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setFilter(filter));
        const data = await usersAPI.getUsers(pageSize, pageNumber, filter.term, filter.friend);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setUsers(data.items));    
    }

type ACType = (userId: number) => ReturnType<typeof actions.followUser> 
                                | ReturnType<typeof actions.unfollowUser>;  
type followUnfollowType = (userId: number) => Promise<APIResponseType>;

const _followUnfollow = async (dispatch: DispatchType, userId: number, methodAPI: followUnfollowType, actionCreator: ACType)
: Promise<void> => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const data = await methodAPI(userId);
    if (data.resultCode === ResultCode.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));    
}

export const follow = (userId: number): ThunkType => 
    async (dispatch) => 
    {
        await _followUnfollow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.followUser);      
    }

export const unfollow = (userId: number): ThunkType => 
    async (dispatch) => 
    {
        await _followUnfollow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actions.unfollowUser);       
    }


export default userReducer;
