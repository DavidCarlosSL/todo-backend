import { IUserJwtBodyRequest } from "../jwt/jwt.interface";

export interface IDeleteTaskByTaskIdAndUserIdInput {
    taskId: number;
    taskUserId: number;
}

export interface IDeleteTaskBody extends IUserJwtBodyRequest {}

export interface IDeleteTaskOutput {
    taskFound: boolean,
    taskDeleted: boolean,
    message: string;
}