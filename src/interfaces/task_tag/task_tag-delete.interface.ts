import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

import { ITagId } from "../../entities/tag/tag.entity";

export interface IDeleteTasktagInput {
    taskTagIds: number[];
}

export interface IDeleteTaskTagOutput {
    taskFound: boolean;

    allTagsFound?: boolean;
    tagsNotFound?: ITagId[];

    allTaskTagsAssociationFound?: boolean;
    taskTagsAssociationNotFound?: ITagId[];

    tagsDissociated: boolean;

    message: string;
}

export interface IDeleteTaskTagBody extends IUserJwtBodyRequest {
    taskId: number;
    tags: ITagId[]
}