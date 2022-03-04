import { UserType } from "../components/types/types";
import { instance } from "./api";
import { GetItemsType, APIResponseType } from "./types";

export const usersAPI = {
    async getUsers (pageSize=10, currentPage=1, term: string="", friend: null | boolean = null) {
        const response = await instance.get<GetItemsType<UserType>>(
            `users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend === null ? "" : `&friend=${friend}`));
        return response.data;
    },
    async unfollowUser (userId: number) {
        const response = await instance.delete<APIResponseType>(`follow/${userId}`);
        return response.data;
    },
    async followUser (userId: number) {
        const response = await instance.post<APIResponseType>(`follow/${userId}`);
        return response.data;
    }
};
