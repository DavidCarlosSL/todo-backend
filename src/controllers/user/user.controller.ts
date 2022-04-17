import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { IUserService, UserService } from "../../services/user/user.service";
import { IJwtService, JwtService } from "../../services/jsonwebtoken/jwt.service";

import { IAuthenticateUserBody, IGetUserByEmailInput, IAuthenticateUserOutput } from "../../interfaces/user/user-authentication.authenticate.interface";
import { IEnrollUserBody, IEnrollUserInput, IEnrollUserOutput } from "../../interfaces/user/user-authentication.enroll.interface";
import { ISignJwtInput } from "../../interfaces/jwt/jwt.interface";

import message from "../../utils/messages/index.json";
import messageUser from "../../utils/messages/user/user.messages.json";

import { getDateTime } from "../../utils/dateTime/dateTime.util";

class UserController {
    constructor(private userService: IUserService, private jwtService: IJwtService) {}

    public async authenticateUser(req: Request, res: Response) {
        let authenticateUserOutput: IAuthenticateUserOutput;
        const noUserFound = () => { 
            authenticateUserOutput = { userFound: false, message: messageUser.no_user_found }
            return res.status(200).send(authenticateUserOutput); 
        };
        try{
            const { userEmail, userPassword }: IAuthenticateUserBody = req.body;

            const userToAuthenticate: IGetUserByEmailInput = { userEmail: userEmail };

            const getUserByEmailResponse = await this.userService.getUserByEmail(userToAuthenticate);
            if(getUserByEmailResponse == undefined)
                return noUserFound();

            const isCorrectPassword = await bcrypt.compare(userPassword, getUserByEmailResponse.user_password)
            if(isCorrectPassword == false)
                return noUserFound();

            const jwtPayload: ISignJwtInput = {
                userId: getUserByEmailResponse.user_id, 
                userName: getUserByEmailResponse.user_name 
            };
            const jwt = await this.jwtService.signJwt(jwtPayload);
            authenticateUserOutput = { userFound: true, jwt: jwt, message: messageUser.user_authenticated };

            res.status(200).send(authenticateUserOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async enrollUser(req: Request, res: Response){
        let enrollUserOutput: IEnrollUserOutput;
        try{
            const { userName, userEmail, userPassword }: IEnrollUserBody = req.body;

            const userToVerifyEnrollment: IGetUserByEmailInput = { userEmail: userEmail };

            const getUserByEmailResponse = await this.userService.getUserByEmail(userToVerifyEnrollment);
            if(getUserByEmailResponse != undefined){
                enrollUserOutput = { emailBeingUsed: true, userEnrolled: false, message: messageUser.email_being_used };

                return res.status(200).send(enrollUserOutput);
            }

            const hashedPassword = await bcrypt.hash(userPassword, 10);
            const now = getDateTime();

            const userToEnroll: IEnrollUserInput = {
                userName: userName, 
                userEmail: userEmail, 
                userPassword: hashedPassword,
                userCreatedAt: now
            };

            await this.userService.enrollUser(userToEnroll);

            enrollUserOutput = {emailBeingUsed: false, userEnrolled: true, message: messageUser.user_enrolled_successfully};

            res.status(200).send(enrollUserOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }
}

export const userController = new UserController(new UserService(), new JwtService());