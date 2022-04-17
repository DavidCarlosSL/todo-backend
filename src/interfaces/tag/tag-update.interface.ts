import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

export interface IUpdateTagByTagIdAndUserIdInput {
    tagId: number;
    tagUserId: number;
    tagName: string;
    tagColor: string;
}

export interface IUpdateTagOutput {
    tagFound: boolean,
    tagUpdated: boolean,
    message: string;
}

export interface IUpdateTagBody extends IUserJwtBodyRequest{
    tagName: string;
    tagColor: string;
}