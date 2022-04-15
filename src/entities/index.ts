import { TaskEntity } from "./task/task.entity";
import { UserEntity } from "./user/user.entity";

export const pgsqlConnectionEntities = [
    UserEntity,
    TaskEntity
]