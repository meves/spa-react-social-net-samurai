import { usersAPI } from "../api/api";

// constants
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


// initial-state
const initialState = {
    users: [],
    pageSize: 5,   
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
                        }
                    }
                    return user;
                })               
            }    
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
export const getUsers = (pageSize, currentPage) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        usersAPI.getUsers(pageSize, currentPage).then(data => {
            dispatch(setIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

export const getCurrentPageUsers = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(pageNumber));
        usersAPI.getUsers(pageSize, pageNumber).then(data => {
            dispatch(setIsFetching(false));
            dispatch(setUsers(data.items));
        });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.unfollowUser(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowUser(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        });
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.followUser(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(followUser(userId));
            }                               
            dispatch(toggleFollowingProgress(false, userId));
        });
    }
}

export default userReducer;
