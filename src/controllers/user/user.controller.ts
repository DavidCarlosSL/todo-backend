import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { IUserService, UserService } from "../../services/user/user.service";
import { IJwtService, JwtService } from "../../services/jsonwebtoken/jwt.service";

import { IAuthenticateUserBody, getUserByEmailInput, IAuthenticateUserOutput } from "../../interfaces/user/user-authentication.authenticate.interface";
import { IEnrollUserBody, IEnrollUserInput } from "../../interfaces/user/user-authentication.enroll.interface";
import { ISignJwtInput } from "../../interfaces/jwt/jwt.interface";

import message from "../../utils/messages/index.json";
import messageUser from "../../utils/messages/user/user.messages.json";

import { getDateTime } from "../../utils/dateTime";

class UserController {
    constructor(private userService: IUserService, private jwtService: IJwtService) {}

    public async authenticateUser(req: Request, res: Response) {
        const noUserFound = () => { return res.status(200).send({userFound: false, message: messageUser.no_user_found}); };
        try{
            const { userEmail, userPassword }: IAuthenticateUserBody = req.body;

            const userToAuthenticate: getUserByEmailInput = { userEmail: userEmail };

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
            const userJwt: IAuthenticateUserOutput = { jwt: jwt };

            res.status(200).send({userFound: true, userJwt: userJwt});
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async enrollUser(req: Request, res: Response){
        try{
            const { userName, userEmail, userPassword }: IEnrollUserBody = req.body;

            const userToVerifyEnrollment: getUserByEmailInput = { userEmail: userEmail };

            const getUserByEmailResponse = await this.userService.getUserByEmail(userToVerifyEnrollment);
            if(getUserByEmailResponse != undefined)
                return res.status(200).send({ emailBeingUsed: true, userHasEnrolled: false, message: messageUser.email_being_used });

            const hashedPassword = await bcrypt.hash(userPassword, 10);
            const now = getDateTime();

            const userToEnroll: IEnrollUserInput = {
                userName: userName, 
                userEmail: userEmail, 
                userPassword: hashedPassword,
                userCreatedAt: now
            };

            await this.userService.enrollUser(userToEnroll);

            res.status(200).send({emailBeingUsed: false, userHasEnrolled: true, message: messageUser.user_enrolled_successfully});
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }
}

export const userController = new UserController(new UserService(), new JwtService());