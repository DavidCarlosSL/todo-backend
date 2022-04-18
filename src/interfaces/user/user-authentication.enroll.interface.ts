export interface IEnrollUserBody {
    userName: string;
    userEmail: string;
    userPassword: string;
}

export interface IEnrollUserInput {
    userName: string;
    userEmail: string;
    userPassword: string;
    userCreatedAt: string;
}

export interface IEnrollUserOutput {
    emailBeingUsed: boolean;
    userEnrolled: boolean;
    message: string;
}