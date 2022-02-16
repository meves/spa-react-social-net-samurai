import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { ResponseDataGetUsersType, ResponseDataType } from "../api/apiTypes";
import { UserType } from "../components/types/types"; 
import { AppStateType } from "./redux-store";
import { ActionsTypes } from "./redux-store";

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
const userReducer = (state=initialState, action: ActionsTypes<ActionType>): InitialStateType => {    
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
        default: 
            return state;
    }
}

// action-creators
const actionCreators = {
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
    } as const)
}
type ActionType = typeof actionCreators;

// thunk creators
type DispatchType = Dispatch<ActionsTypes<ActionType>>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType>>;

export const getUsers = (pageSize: number, currentPage: number): ThunkType => 
    async (dispatch) => 
    {
        dispatch(actionCreators.setIsFetching(true));
        const data: ResponseDataGetUsersType = await usersAPI.getUsers(pageSize, currentPage);
        dispatch(actionCreators.setIsFetching(false));
        dispatch(actionCreators.setUsers(data.items));
        dispatch(actionCreators.setTotalUsersCount(data.totalCount));    
    }

export const getCurrentPageUsers = (pageSize: number, pageNumber: number): ThunkType => 
    async (dispatch) => 
    {
        dispatch(actionCreators.setIsFetching(true));
        dispatch(actionCreators.setCurrentPage(pageNumber));
        const data: ResponseDataGetUsersType = await usersAPI.getUsers(pageSize, pageNumber);
        dispatch(actionCreators.setIsFetching(false));
        dispatch(actionCreators.setUsers(data.items));    
    }

type ActionCreatorType = (userId: number) => ActionsTypes<ActionType>;  
type followUnfollowType = (userId: number) => Promise<ResponseDataType<{}>>;
const _followUnfollow = async (dispatch: DispatchType, userId: number, methodAPI: followUnfollowType, actionCreator: ActionCreatorType)
: Promise<void> => {
    dispatch(actionCreators.toggleFollowingProgress(true, userId));
    const data = await methodAPI(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actionCreators.toggleFollowingProgress(false, userId));    
}

export const unfollow = (userId: number): ThunkType => 
    async (dispatch) => 
    {
        _followUnfollow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actionCreators.unfollowUser);       
    }

export const follow = (userId: number): ThunkType => 
    async (dispatch) => 
    {
        _followUnfollow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actionCreators.followUser);      
    }

export default userReducer;
