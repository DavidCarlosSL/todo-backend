import { Request } from "express";

import { JwtPayload } from "jsonwebtoken";

export interface ISignJwtInput {
    userId: number;
    userName: string;
}

export interface IVerifyJwtInput {
    jwt: string;
}

export interface IVerifyUserJwtOutput {
    tokenProvided: boolean;
    validToken: boolean;
    message: string;
}

export interface IUserJwtPayload extends JwtPayload {
    payload: ISignJwtInput;
}

export interface IJwtRequest extends Request {
    userJwt: IUserJwtPayload;
}