import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

import { ITask } from "../../entities/task/task.entity";

export interface IGetTasksByUserIdInput {
    taskUserId: number;
}

export interface IGetTaskByTaskIdAndUserIdInput {
    taskId: number;
    taskUserId: number;
}

export interface IGetUserTasksBody extends IUserJwtBodyRequest {}

export interface IGetUserTaskBody extends IUserJwtBodyRequest {}

export interface IGetUserTasksOutput {
    tasksFound: boolean;
    tasks?: ITask[];
    message: string;
}

export interface IGetUserTaskOutput {
    taskFound: boolean;
    task?: ITask;
    message: string;
}