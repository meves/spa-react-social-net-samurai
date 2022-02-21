import { ProfileType } from "../components/types/types";
import { instance } from "./api";
import { PhotoDataType, APIResponseType } from "./types";

export const profileAPI = {
    async getUserProfile (userId: number) {
        const response = await instance.get<ProfileType>(`profile/${userId}`);
        return response.data;
    },
    async getStatus(userId: number) {
        const response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },
    async updateStatus(status: string) {
        const response = await instance.put<APIResponseType>(`profile/status`, { status });
        return response.data;
    },
    async putPhoto(photoFile: File) {
        const formData: FormData = new FormData();
        formData.append('image', photoFile);
        const response =  await instance.put<APIResponseType<PhotoDataType>>('profile/photo', formData, { headers: 
                { 'Content-Type': 'multipart/form-data' }});
        return response.data;
    },
    async putProfile(profile: ProfileType) {
        const response = await instance.put<APIResponseType>('/profile', {...profile});
        return response.data;
    }
};
