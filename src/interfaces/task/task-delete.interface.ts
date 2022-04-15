import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

export interface IDeleteTaskByTaskIdAndUserIdInput {
    taskId: number;
    taskUserId: number;
}

export interface IDeleteUserTaskBody extends IUserJwtBodyRequest {}

export interface IDeleteUserTaskOutput {
    taskFound: boolean,
    taskDeleted: boolean,
    message: string;
}