import { Connection, DeleteResult, getConnection, InsertResult, Repository} from "typeorm";

import { ITaskTag, TaskTagEntity } from "../../entities/task_tag/task_tag.entity";

import { IGetTaskTagByTaskIdAndTagIdInput } from "../../interfaces/task_tag/task_tag-get.interface";
import { IInsertTaskTagInput } from "../../interfaces/task_tag/task_tag-insert.interface";
import { IDeleteTasktagInput } from "../../interfaces/task_tag/task_tag-delete.interface";

export interface ITaskTagService {
    insertTaskTag(insertTaskTagInput: IInsertTaskTagInput[]): Promise<InsertResult>
    getTaskTagByTaskIdAndTagId(getTaskTagByTaskIdAndTagIdInput: IGetTaskTagByTaskIdAndTagIdInput): Promise<ITaskTag | undefined>
    deleteTaskTag(deleteTasktagInput: IDeleteTasktagInput): Promise<DeleteResult>
}

export class TaskTagService implements ITaskTagService {
    private pgsqlConnection: Connection;
    private taskTagRepository: Repository<TaskTagEntity>;
    
    constructor(){ 
        this.pgsqlConnection = getConnection("pgsql");
        this.taskTagRepository = this.pgsqlConnection.getRepository(TaskTagEntity);
    }

    public async insertTaskTag(insertTaskTagInput: IInsertTaskTagInput[]): Promise<InsertResult>{
        try{
            return await this.taskTagRepository.createQueryBuilder()
            .insert()
            .into(TaskTagEntity)
            .values(insertTaskTagInput)
            .execute();
        }catch(error){
            throw error;
        }
    }
    
    public async getTaskTagByTaskIdAndTagId(getTaskTagByTaskIdAndTagIdInput: IGetTaskTagByTaskIdAndTagIdInput): Promise<ITaskTag | undefined>{
        try{
            return await this.taskTagRepository.createQueryBuilder()
            .where("task_id = :taskId AND tag_id = :tagId", { taskId: getTaskTagByTaskIdAndTagIdInput.taskId, tagId: getTaskTagByTaskIdAndTagIdInput.tagId })
            .getOne();
        }catch(error){
            throw error;
        }
    }

    public async deleteTaskTag(deleteTasktagInput: IDeleteTasktagInput): Promise<DeleteResult>{
        try{
            return await this.taskTagRepository.createQueryBuilder()
            .delete()
            .from(TaskTagEntity)
            .where("task_tag_id IN(:...taskTagIds)", { taskTagIds: deleteTasktagInput.taskTagIds })
            .execute();
        }catch(error){
            throw error;
        }
    }
}