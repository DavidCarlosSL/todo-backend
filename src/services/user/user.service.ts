import { Connection, getConnection, InsertResult, Repository } from "typeorm";

import { IUser, UserEntity } from "../../entities/user/user.entity";

import { IGetUserByEmailInput } from "../../interfaces/user/user-authentication.authenticate.interface";
import { IEnrollUserInput } from "../../interfaces/user/user-authentication.enroll.interface";

export interface IUserService {
    getUserByEmail(getUserByEmailInput: IGetUserByEmailInput): Promise<IUser | undefined>;
    enrollUser(enrollUserInput: IEnrollUserInput): Promise<InsertResult | undefined>;
}

export class UserService implements IUserService {
    private pgsqlConnection: Connection;
    private userRepository: Repository<UserEntity>;
    
    constructor(){ 
        this.pgsqlConnection = getConnection("pgsql");
        this.userRepository = this.pgsqlConnection.getRepository(UserEntity);
    }

    public async getUserByEmail(getUserByEmailInput: IGetUserByEmailInput): Promise<IUser | undefined> {
        try{
            return await this.userRepository.createQueryBuilder()
            .where("user_email = :userEmail", { userEmail: getUserByEmailInput.userEmail }).getOne();
        }catch(error){ 
            throw error;
        }
    }

    public async enrollUser(enrollUserInput: IEnrollUserInput): Promise<InsertResult | undefined>{
        try{
            return await this.userRepository.createQueryBuilder().insert().into(UserEntity)
            .values([{
                user_name: enrollUserInput.userName,
                user_email: enrollUserInput.userEmail,
                user_password: enrollUserInput.userPassword,
                user_createdAt: enrollUserInput.userCreatedAt
            }])
            .execute();
        }catch(error){
            throw error;
        }
    }
}