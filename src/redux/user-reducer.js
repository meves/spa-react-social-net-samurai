import { usersAPI } from "../api/api";

// constants
const FOLLOW = 'my-app/user/FOLLOW';
const UNFOLLOW = 'my-app/user/UNFOLLOW';
const SET_USERS = 'my-app/user/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/user/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/user/SET_TOTAL_USERS_COUNT';
const TOGGLE_PRELOADER = 'my-app/user/TOGGLE_PRELOADER';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'my-app/user/TOGGLE_IS_FOLLOWING_PROGRESS';


// initial-state
const initialState = {
    users: [],
    pageSize: 10,   
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: [],
    fake: 0
}

// reducer
const userReducer = (state=initialState, action) => {    
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
export const followUser = (userId) => {
    return {
        type: FOLLOW,
        userId
    };
}

export const unfollowUser = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    };
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    };
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setTotalUsersCount = (totalCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalCount
    }
}

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_PRELOADER,
        isFetching
    };
}

export const toggleFollowingProgress = (isFetching, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    };
}

// thunk creators
export const getUsers = (pageSize, currentPage) => async (dispatch) => {
    dispatch(setIsFetching(true));
    const data = await usersAPI.getUsers(pageSize, currentPage);
    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));    
}

export const getCurrentPageUsers = (pageSize, pageNumber) => async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(pageNumber));
    const data = await usersAPI.getUsers(pageSize, pageNumber);
    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));    
}

const followUnfollow = async (dispatch, userId, methodAPI, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await methodAPI(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));    
}

export const unfollow = (userId) => async (dispatch) => {
    followUnfollow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollowUser);       
}

export const follow = (userId) => async (dispatch) => {
    followUnfollow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followUser);      
}

export default userReducer;
