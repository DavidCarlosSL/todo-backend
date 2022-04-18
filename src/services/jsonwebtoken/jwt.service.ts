import jsonwebtoken from "jsonwebtoken";

import { ISignJwtInput, IVerifyJwtInput } from "../../interfaces/jwt/jwt.interface";

import messageJwt from "../../utils/messages/jwt/jwt.messages.json";

export interface IJwtService {
    signJwt(payloadToSign: ISignJwtInput): Promise<string>;
    verifyJwt(payloadToDecode: IVerifyJwtInput): Promise<string | jsonwebtoken.JwtPayload>
}

export class JwtService implements IJwtService {
    private secretKey: string | undefined;

    constructor() {
        this.secretKey = process.env.APPLICATION_JWT_PRIVATE_KEY;
    }

    private getSecretKey(): Promise<string>{
        return new Promise((resolve, reject) => {
            if(this.secretKey == undefined)
                reject(messageJwt.error.jwt_private_key_undefined);
            else
                resolve(this.secretKey);
        });
    }

    public async signJwt(payloadToSign: ISignJwtInput): Promise<string>{
        try{
            const secretKey = await this.getSecretKey();
            const signedJwt = jsonwebtoken.sign(payloadToSign, secretKey, {expiresIn: "24h"});
            
            return signedJwt;
        }catch(error){
            throw error;
        }
    }

    public async verifyJwt(payloadToDecode: IVerifyJwtInput): Promise<string | jsonwebtoken.JwtPayload> {
        try{
            const secretKey = await this.getSecretKey();
            const verifiedJwt = jsonwebtoken.verify(payloadToDecode.jwt, secretKey);

            return verifiedJwt;
        }catch(error){
            throw error;
        }
    }
}