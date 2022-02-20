import { Request, Response } from "express";

import { IUserService, UserService } from "../../services/user/user.service";

class UserController {
    constructor(private userService: IUserService) {}

    public async authenticateUser(req: Request, res: Response) {
        try{
            
        }catch{
            
        }
    }
}

export const userController = new UserController(new UserService());