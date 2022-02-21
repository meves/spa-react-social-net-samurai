import { PhotosType, UserType } from "../components/types/types"
import { ResultCode } from "./enums"

export type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCode> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

export type AuthMeDataType = {
    id: number
    email: string
    login: string    
}

export type LoginDataType = {
    userId: number
}

export type PhotoDataType = {
    photos: PhotosType
}

export type ResponseGetCaptchaUrlType = {
    url: string
}
