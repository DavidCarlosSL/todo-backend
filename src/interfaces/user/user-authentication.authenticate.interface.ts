export interface IAuthenticateUserBody {
    userEmail: string;
    userPassword: string;
}

export interface getUserByEmailInput {
    userEmail: string;
}

export interface IAuthenticateUserOutput {
    jwt: string;
}