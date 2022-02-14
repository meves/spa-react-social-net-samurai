import axios, { AxiosResponse } from 'axios';
import { ResponseDataAuthLoginType, ResponseDataEmptyType, ResponseDataAuthMeType, 
    ResponseDataGetUsersType, 
    ResponseDataPutProfilePhotoType,
    ResponseDataGetCaptchaUrl} from '../types/apiTypes';
import { ProfileType } from '../types/types';

const ax = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "a4367af1-edc7-4a2a-bdcc-eb84478de1f8"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'

});

export const authAPI = {
    async authMe (): Promise<ResponseDataAuthMeType> {
        const response: AxiosResponse<ResponseDataAuthMeType> = await ax.get<ResponseDataAuthMeType>('auth/me');
        return response.data;
    },
    async login(email: string, password: string, rememberMe=false, captcha: boolean|undefined): Promise<ResponseDataAuthLoginType> {
        const response: AxiosResponse<ResponseDataAuthLoginType> = 
            await ax.post<ResponseDataAuthLoginType>(`auth/login`, {email, password, rememberMe, captcha});
        return response.data;
    },
    async logout(): Promise<ResponseDataEmptyType> {
        const response: AxiosResponse<ResponseDataEmptyType> = await ax.delete<ResponseDataEmptyType>(`auth/login`);
        return response.data;
    }
};

export const usersAPI = {
    async getUsers (pageSize=10, currentPage=1): Promise<ResponseDataGetUsersType> {
        const response: AxiosResponse<ResponseDataGetUsersType> = 
            await ax.get<ResponseDataGetUsersType>(`users?count=${pageSize}&page=${currentPage}`);
        return response.data;
    },
    async unfollowUser (userId: number): Promise<ResponseDataEmptyType> {
        const response: AxiosResponse<ResponseDataEmptyType> = 
            await ax.delete<ResponseDataEmptyType>(`follow/${userId}`);
        return response.data;
    },
    async followUser (userId: number): Promise<ResponseDataEmptyType> {
        const response: AxiosResponse<ResponseDataEmptyType> = 
            await ax.post<ResponseDataEmptyType>(`follow/${userId}`);
        return response.data;
    }
};

export const profileAPI = {
    async getUserProfile (userId: number): Promise<ProfileType> {
        const response: AxiosResponse<ProfileType> = await ax.get<ProfileType>(`profile/${userId}`);
        return response.data;
    },
    async getStatus(userId: number): Promise<string> {
        const response: AxiosResponse<string> = await ax.get<string>(`profile/status/${userId}`);
        return response.data;
    },
    async updateStatus(status: string): Promise<ResponseDataEmptyType> {
        const response: AxiosResponse<ResponseDataEmptyType> = await ax.put<ResponseDataEmptyType>(`profile/status`, { status });
        return response.data;
    },
    async putPhoto(photoFile: any): Promise<ResponseDataPutProfilePhotoType> {
        const formData: FormData = new FormData();
        formData.append('image', photoFile);
        const response: AxiosResponse<ResponseDataPutProfilePhotoType> = 
            await ax.put<ResponseDataPutProfilePhotoType>('profile/photo', formData, { headers: 
                { 'Content-Type': 'multipart/form-data' }});
        return response.data;
    },
    async putProfile(profile: ProfileType): Promise<ResponseDataEmptyType> {
        const response: AxiosResponse<ResponseDataEmptyType> = await ax.put<ResponseDataEmptyType>('/profile', {...profile});
        return response.data;
    }
};

export const securityAPI = {
    async getCaptchaUrl (): Promise<ResponseDataGetCaptchaUrl> {
        const response: AxiosResponse<ResponseDataGetCaptchaUrl> = 
            await ax.get<ResponseDataGetCaptchaUrl>('security/get-captcha-url');
        return response.data;
    }
}
