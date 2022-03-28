import { NextFunction, Response } from "express";

import { IJwtRequest, IUserJwtPayload, IVerifyUserJwtOutput } from "../interfaces/jwt/jwt.interface";

import { JwtService } from "../services/jsonwebtoken/jwt.service";

import message from "../utils/messages/index.json";
import jwtMessage from "../utils/messages/jwt/jwt.messages.json"

export function verifyUserJwt() {
    return async (req: IJwtRequest, res: Response, next: NextFunction) => {
        let verifyUserJwtOutput: IVerifyUserJwtOutput;
        try{
            const authorization = req.header("authorization");
            if(authorization == undefined){
                verifyUserJwtOutput = { tokenProvided: false, validToken: false, message: jwtMessage.no_token_provided };
                
                return res.status(401).send(verifyUserJwtOutput);
            }

            const jwtService = new JwtService();

            const verifiedJwt: IUserJwtPayload | string = await jwtService.verifyJwt({jwt: authorization});
            if(typeof verifiedJwt === "string")
                throw new Error();
            
            req.userJwt = verifiedJwt;
             
            next();
        }catch(error){
            if(typeof error === "object"){ //Type of error thrown by jsonwebtoken.verify when JWT is invalid
                verifyUserJwtOutput = { tokenProvided: true, validToken: false, message: jwtMessage.invalid_token };

                return res.status(400).send(verifyUserJwtOutput);
            }

            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }
}