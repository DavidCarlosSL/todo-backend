import { TaskStatus } from "../../entities/task/task.entity";

import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

export interface IInsertUserTaskInput {
    taskTitle: string;
    taskDescription: string;
    taskStatus: TaskStatus;
    taskCreatedAt: string;
    taskUserId: number;
}

export interface ISaveNewUserTaskBody extends IUserJwtBodyRequest {
    taskTitle: string;
    taskDescription: string;
    taskStatus: TaskStatus;
}

export interface ISaveNewUserTaskOutput {
    newTaskSaved: boolean,
    task: { taskId: number },
    message: string;
}