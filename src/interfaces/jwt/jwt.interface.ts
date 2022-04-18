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

export interface IDecodedUserJwt {
    payload: ISignJwtInput;
}

export interface IUserJwtBodyRequest {
    userJwt: IDecodedUserJwt;
}