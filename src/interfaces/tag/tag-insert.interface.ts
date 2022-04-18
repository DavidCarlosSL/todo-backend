import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

export interface IInsertTagInput {
    tagName: string;
    tagColor: string;
    tagCreatedAt: Date | string;
    tagUserId: number;
}

export interface ISaveNewTagBody extends IUserJwtBodyRequest {
    tagName: string;
    tagColor: string;
}

export interface ISaveNewTagOutput {
    newTagSaved: boolean,
    tag: { tagId: number },
    message: string;
}