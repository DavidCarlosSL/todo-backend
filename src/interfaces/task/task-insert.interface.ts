import { TaskStatus } from "../../entities/task/task.entity";

import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

export interface IInsertTaskInput {
    taskTitle: string;
    taskDescription: string;
    taskStatus: TaskStatus;
    taskCreatedAt: string;
    taskUserId: number;
}

export interface ISaveNewTaskBody extends IUserJwtBodyRequest {
    taskTitle: string;
    taskDescription: string;
    taskStatus: TaskStatus;
}

export interface ISaveNewTaskOutput {
    newTaskSaved: boolean,
    task: { taskId: number },
    message: string;
}