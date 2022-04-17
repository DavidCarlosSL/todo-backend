import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

import { ITask } from "../../entities/task/task.entity";

export interface IGetTasksByUserIdInput {
    taskUserId: number;
}

export interface IGetTaskByTaskIdAndUserIdInput {
    taskId: number;
    taskUserId: number;
}

export interface IGetTasksBody extends IUserJwtBodyRequest {}

export interface IGetTaskBody extends IUserJwtBodyRequest {}

export interface IGetTasksOutput {
    tasksFound: boolean;
    tasks?: ITask[];
    message: string;
}

export interface IGetTaskOutput {
    taskFound: boolean;
    task?: ITask;
    message: string;
}