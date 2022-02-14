import { ResultCode, ResultCodeForCaptcha } from "../enums/resultCodes"

// Components Types
export type PostType = { 
    id: number
    message: string
    likesCount: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ContactsType
    photos: PhotosType
}

export type UserType = {
    name: string
    id: number
    status: string
    followed: boolean
    photos: PhotosType
}

export type MenuItemType = {
    id: number
    itemName: string
    to: string
}
export type NameType = {
    id: number
    name: string
}

export type DialogType = { 
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
