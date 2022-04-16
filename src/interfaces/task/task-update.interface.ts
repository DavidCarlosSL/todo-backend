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

export interface IUpdateTaskOutput {
    taskFound: boolean,
    taskUpdated: boolean,
    message: string;
}

export interface IUpdateTaskDateConclusionOutput {
    taskFound: boolean,
    taskUpdated: boolean,
    message: string;
}

export interface IUpdateTaskBody extends IUserJwtBodyRequest, ITaskUpdateInput {}

export interface IUpdateTaskDateConclusionByTaskIdAndUserIdInput {
    taskUserId: number;
    taskId: number;
    taskDateConclusion: string | null;
}

export interface IUpdateTaskDateConclusionBody extends IUserJwtBodyRequest {
    taskCompleted: boolean;
}