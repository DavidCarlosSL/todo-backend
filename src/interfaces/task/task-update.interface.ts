import { TaskStatus } from "../../entities/task/task.entity";

import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

interface ITaskUpdateInput {
    taskTitle: string;
    taskDescription: string;
    taskStatus: TaskStatus;
}

export interface IUpdateTaskByTaskIdAndUserIdInput {
    taskUserId: number;
    taskId: number;
    task: ITaskUpdateInput
}

export interface IUpdateUserTaskOutput {
    taskFound: boolean,
    taskUpdated: boolean,
    message: string;
}

export interface IUpdateUserTaskDateConclusionOutput {
    taskFound: boolean,
    taskUpdated: boolean,
    message: string;
}

export interface IUpdateUserTaskBody extends IUserJwtBodyRequest, ITaskUpdateInput {}

export interface IUpdateTaskDateConclusionByTaskIdAndUserIdInput {
    taskUserId: number;
    taskId: number;
    taskDateConclusion: string | null;
}

export interface IUpdateUserTaskDateConclusionBody extends IUserJwtBodyRequest {
    taskCompleted: boolean;
}