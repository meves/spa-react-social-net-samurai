import { PhotosType, UserType } from "../components/types/types"

export type ResponseDataType<DataType> = {
    data: DataType
    resultCode: number
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

export type ProfilePhotoDataType = {
    photos: PhotosType
}

export type ResponseDataGetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export type ResponseDataGetCaptchaUrl = {
    url: string
}
