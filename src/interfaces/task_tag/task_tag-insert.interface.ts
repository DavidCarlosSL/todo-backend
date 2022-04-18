import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

import { ITagId } from "../../entities/tag/tag.entity";

export interface IInsertTaskTagInput {
    task_id: number;
    tag_id: number;
}

export interface ISaveNewTaskTagOutput {
    taskFound: boolean;

    allTagsFound?: boolean;
    tagsNotFound?: ITagId[];
    
    tagsAlreadyAssociated?: ITagId[];

    newTagsAssociated: boolean;
    
    message: string;
}

export interface ISaveNewTaskTagBody extends IUserJwtBodyRequest {
    taskId: number;
    tags: ITagId[]
}