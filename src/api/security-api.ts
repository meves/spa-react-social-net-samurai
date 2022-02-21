import { instance } from "./api";
import { ResponseGetCaptchaUrlType } from "./types";

export const securityAPI = {
    async getCaptchaUrl () {
        const response = await instance.get<ResponseGetCaptchaUrlType>('security/get-captcha-url');
        return response.data;
    }
}
