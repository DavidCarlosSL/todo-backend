import { TagEntity } from "./tag/tag.entity";
import { TaskEntity } from "./task/task.entity";
import { TaskTagEntity } from "./task_tag/task_tag.entity";
import { UserEntity } from "./user/user.entity";

export const pgsqlConnectionEntities = [
    UserEntity,
    TaskEntity,
    TagEntity,
    TaskTagEntity
]