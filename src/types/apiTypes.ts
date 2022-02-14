import { PhotosType, ProfileType, UserType } from "./types"

export type ResponseDataAuthMeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}
export type ResponseDataAuthLoginType = {
    data: {
        userId: number
    }
    resultCode: number
    messages: Array<string>
}
export type ResponseDataEmptyType = {
    data: { }
    resultCode: number
    messages: Array<string>
}
export type ResponseDataGetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export type ResponseDataPutProfilePhotoType = {
    data: {
        photos: PhotosType
    }
    resultCode: number
    messages: Array<string>
}
export type ResponseDataGetCaptchaUrl = {
    url: string
}