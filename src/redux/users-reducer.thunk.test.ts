import { actions, follow, unfollow } from "./user-reducer";
import { usersAPI } from "../api/users-api";
import { APIResponseType } from "../api/types";
import { ResultCode } from "../api/enums";

jest.mock("../api/users-api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: APIResponseType = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {}
}

const dispatchMock = jest.fn();
const getStateMock = jest.fn();
beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.followUser.mockClear();
    usersAPIMock.unfollowUser.mockClear();
});

describe("test thunk", () => {
    test("follow", async () => {
        const userId = 2;        
        usersAPIMock.followUser.mockReturnValue(Promise.resolve(result));
        const thunk = follow(userId);
        await thunk(dispatchMock, getStateMock, {});    
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, userId));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followUser(userId));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, userId));
    });
    test("unfollow", async () => {
       const userId = 2;
       usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));
       const thunk = unfollow(userId);
       await thunk(dispatchMock, getStateMock, {});
       expect(dispatchMock).toBeCalledTimes(3);
       expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, userId));
       expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowUser(userId));
       expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, userId)); 
    });
});
