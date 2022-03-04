import { UserType } from '../components/types/types';
import userReducer, { InitialStateType, actions } from './user-reducer';

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            { id:0, name: "Sergey", status: "My status", followed: false, photos: { small: null, large: null} },
            { id:1, name: "Viktor", status: "My status", followed: false, photos: { small: null, large: null} },
            { id:2, name: "Andrew", status: "My status", followed: true, photos: { small: null, large: null} },
            { id:3, name: "Oleg", status: "My status", followed: true, photos: { small: null, large: null} }
        ],
        pageSize: 10,   
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingProgress: [],
        filter: {
            term: "",
            friend: null
        }
    }
});

describe("userReducer", () => {
    test("follow user with id success", () => {
    const userId: number = 0;
    const action = { type: "my-app/user/FOLLOW", userId } as const;
        const newState: InitialStateType = userReducer(state, action);
        expect(newState.users[0].followed).toBeTruthy();
        expect(newState.users[1].followed).toBeFalsy();
        expect(newState.users[2].followed).toBeTruthy();
        expect(newState.users[3].followed).toBeTruthy();
    });
    test("unfollow user with id success", () => {
        const userId: number = 2;
        const action = { type: "my-app/user/UNFOLLOW", userId} as const;
        const newState: InitialStateType = userReducer(state, action);
        expect(newState.users[0].followed).toBeFalsy();
        expect(newState.users[1].followed).toBeFalsy();
        expect(newState.users[2].followed).toBeFalsy();
        expect(newState.users[3].followed).toBeTruthy();
    });
});

describe("action creators", () => {
    test("followUser", () => {
        const userId = 0;
        const action = {type: 'my-app/user/FOLLOW', userId} as const;
        const newAction = actions.followUser(userId);
        expect(newAction).toEqual(action);
    });
    test("unfollowUser", () => {
        const userId = 0;
        const action = {type: 'my-app/user/UNFOLLOW', userId} as const;
        const newAction = actions.unfollowUser(userId);
        expect(newAction).toEqual(action);
    });
});
