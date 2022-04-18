export interface IAuthenticateUserBody {
    userEmail: string;
    userPassword: string;
}

export interface IGetUserByEmailInput {
    userEmail: string;
}

export interface IAuthenticateUserOutput {
    userFound: boolean;
    message?: string;
    jwt?: string;
}