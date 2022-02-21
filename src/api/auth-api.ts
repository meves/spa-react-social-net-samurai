import { instance } from "./api";
import { ResultCode, ResultCodeForCaptcha } from "./enums";
import { AuthMeDataType, LoginDataType, APIResponseType,  } from "./types";

export const authAPI = {
    async authMe () {
        const response = await instance.get<APIResponseType<AuthMeDataType>>('auth/me');
        return response.data;
    },
    async login(email: string, password: string, rememberMe=false, captcha: boolean|undefined) {
        const response = await instance.post<APIResponseType<LoginDataType, ResultCode | ResultCodeForCaptcha>>(`auth/login`, 
            {email, password, rememberMe, captcha});
        return response.data;
    },
    async logout() {
        const response = await instance.delete<APIResponseType>(`auth/login`);
        return response.data;
    }
};
