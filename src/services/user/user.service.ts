import { Connection, getConnection, Repository } from "typeorm";

import { UserEntity } from "../../entities/user/user.entity";

import { IUserAuthenticationInput, IUserAuthenticationOutput } from "../../interfaces/user/user-authentication.interface";

export interface IUserService {
    getUserByEmailAndPassword(userAuthenticationInput: IUserAuthenticationInput): Promise<IUserAuthenticationOutput | undefined>
}

export class UserService implements IUserService {
    private pgsqlConnection: Connection;
    private userRepository: Repository<UserEntity>;
    
    constructor(){ 
        this.pgsqlConnection = getConnection("pgsql");
        this.userRepository = this.pgsqlConnection.getRepository(UserEntity);
    }

    public async getUserByEmailAndPassword(userAuthenticationInput: IUserAuthenticationInput): Promise<IUserAuthenticationOutput | undefined> {
        try{
            return await this.userRepository.createQueryBuilder()
            .where("user_email = :userEmail AND user_password = :userPassword", {
                userEmail: userAuthenticationInput.userEmail, 
                userPassword: userAuthenticationInput.userPassword
            }).getOne();
        }catch{ 
            
        }
    }
}