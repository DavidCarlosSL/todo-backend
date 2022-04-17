import { ITag } from "../../entities/tag/tag.entity";

import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

export interface IGetTagsByUserIdInput {
    tagUserId: number;
}

export interface IGetTagsOutput {
    tagsFound: boolean;
    tags?: ITag[];
    message: string;
}

export interface IGetTagsBody extends IUserJwtBodyRequest {}

export interface IGetTagByTagIdAndUserIdInput {
    tagId: number;
    tagUserId: number;
}

export interface IGetTagOutput {
    tagFound: boolean;
    tag?: ITag;
    message: string;
}

export interface IGetTagBody extends IUserJwtBodyRequest {}