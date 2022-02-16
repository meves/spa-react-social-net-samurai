import axios, { AxiosResponse } from 'axios';
import { ResponseDataGetUsersType, ResponseDataGetCaptchaUrl, ResponseDataType, 
    AuthMeDataType, LoginDataType, ProfilePhotoDataType } from './apiTypes';
import { ProfileType } from '../components/types/types';

const ax = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "a4367af1-edc7-4a2a-bdcc-eb84478de1f8"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'

});

export const authAPI = {
    async authMe () {
        const response = await ax.get<ResponseDataType<AuthMeDataType>>('auth/me');
        return response.data;
    },
    async login(email: string, password: string, rememberMe=false, captcha: boolean|undefined) {
        const response = await ax.post<ResponseDataType<LoginDataType>>(`auth/login`, 
            {email, password, rememberMe, captcha});
        return response.data;
    },
    async logout() {
        const response = await ax.delete<ResponseDataType<{}>>(`auth/login`);
        return response.data;
    }
};

export const usersAPI = {
    async getUsers (pageSize=10, currentPage=1) {
        const response = await ax.get<ResponseDataGetUsersType>(`users?count=${pageSize}&page=${currentPage}`);
        return response.data;
    },
    async unfollowUser (userId: number) {
        const response = await ax.delete<ResponseDataType<{}>>(`follow/${userId}`);
        return response.data;
    },
    async followUser (userId: number) {
        const response = await ax.post<ResponseDataType<{}>>(`follow/${userId}`);
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
    async updateStatus(status: string) {
        const response = await ax.put<ResponseDataType<{}>>(`profile/status`, { status });
        return response.data;
    },
    async putPhoto(photoFile: any) {
        const formData: FormData = new FormData();
        formData.append('image', photoFile);
        const response =  await ax.put<ResponseDataType<ProfilePhotoDataType>>('profile/photo', formData, { headers: 
                { 'Content-Type': 'multipart/form-data' }});
        return response.data;
    },
    async putProfile(profile: ProfileType) {
        const response = await ax.put<ResponseDataType<{}>>('/profile', {...profile});
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
