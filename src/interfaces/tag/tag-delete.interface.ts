import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

export interface IDeleteTagByTagIdAndUserIdInput {
    tagId: number;
    tagUserId: number;
}

export interface IDeleteTagOutput {
    tagFound: boolean;
    tagDeleted: boolean;
    message: string;
}

export interface IDeleteTagBody extends IUserJwtBodyRequest {}