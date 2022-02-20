export interface IUserAuthenticationInput {
    userEmail: string;
    userPassword: string;
}

export interface IUserAuthenticationOutput {
    user_id: number;
}