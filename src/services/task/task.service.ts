import { Connection, DeleteResult, getConnection, InsertResult, Repository, UpdateResult } from "typeorm";

import { ITask, TaskEntity } from "../../entities/task/task.entity";

import { IGetTaskByTaskIdAndUserIdInput, IGetTasksByUserIdInput } from "../../interfaces/task/task-get.interface";
import { IInsertUserTaskInput } from "../../interfaces/task/task-insert.interface";
import { IDeleteTaskByTaskIdAndUserIdInput } from "../../interfaces/task/task-delete.interface";
import { IUpdateTaskByTaskIdAndUserIdInput, IUpdateTaskDateConclusionByTaskIdAndUserIdInput } from "../../interfaces/task/task-update.interface";

export interface ITaskService {
    insertUserTask(insertUserTaskInput: IInsertUserTaskInput): Promise<InsertResult>
    getTasksByUserId(getTasksByUserIdInput: IGetTasksByUserIdInput): Promise<ITask[]>
    getTaskByTaskIdAndUserId(getTaskByTaskIdAndUserIdInput: IGetTaskByTaskIdAndUserIdInput): Promise<ITask | undefined>
    deleteTaskByTaskIdAndUserId(deleteTaskByTaskIdAndUserIdInput: IDeleteTaskByTaskIdAndUserIdInput): Promise<DeleteResult>
    updateTaskByTaskIdAndUserId(updateTaskByTaskIdAndUserIdInput: IUpdateTaskByTaskIdAndUserIdInput): Promise<UpdateResult>
    updateTaskDateConclusionByTaskIdAndUserId(updateTaskDateConclusionByTaskIdAndUserIdInput: IUpdateTaskDateConclusionByTaskIdAndUserIdInput): Promise<UpdateResult>
}

export class TaskService implements ITaskService {
    private pgsqlConnection: Connection;
    private taskRepository: Repository<TaskEntity>;
    
    constructor(){ 
        this.pgsqlConnection = getConnection("pgsql");
        this.taskRepository = this.pgsqlConnection.getRepository(TaskEntity);
    }

    public async insertUserTask(insertUserTaskInput: IInsertUserTaskInput): Promise<InsertResult>{
        try{
            return await this.taskRepository.createQueryBuilder()
            .insert()
            .into(TaskEntity)
            .values([
                { 
                    task_title: insertUserTaskInput.taskTitle,
                    task_description: insertUserTaskInput.taskDescription,
                    task_status: insertUserTaskInput.taskStatus,
                    task_createdAt: insertUserTaskInput.taskCreatedAt,
                    task_user: insertUserTaskInput.taskUserId
                }
            ])
            .execute();
        }catch(error){
            throw error;
        }
    }

    public async getTasksByUserId(getTasksByUserIdInput: IGetTasksByUserIdInput): Promise<ITask[]> {
        try{
            return await this.taskRepository.createQueryBuilder()
            .where("task_user = :userId", { userId: getTasksByUserIdInput.taskUserId })
            .getMany();
        }catch(error){ 
            throw error;
        }
    }

    public async getTaskByTaskIdAndUserId(getTaskByUserIdInput: IGetTaskByTaskIdAndUserIdInput): Promise<ITask | undefined>{
        try{
            return await this.taskRepository.createQueryBuilder()
            .where("task_id = :taskId AND task_user = :taskUserId", { taskId: getTaskByUserIdInput.taskId, taskUserId: getTaskByUserIdInput.taskUserId })
            .getOne();
        }catch(error){
            throw error;
        }
    }

    public async deleteTaskByTaskIdAndUserId(deleteTaskByTaskIdAndUserIdInput: IDeleteTaskByTaskIdAndUserIdInput): Promise<DeleteResult>{
        try{
            return await this.taskRepository.createQueryBuilder()
            .delete()
            .from(TaskEntity)
            .where("task_id = :taskId AND task_user = :taskUserId", {
                taskId: deleteTaskByTaskIdAndUserIdInput.taskId,
                taskUserId: deleteTaskByTaskIdAndUserIdInput.taskUserId
            })
            .execute();
        }catch(error){
            throw error;
        }
    }

    public async updateTaskByTaskIdAndUserId(updateTaskByTaskIdAndUserIdInput: IUpdateTaskByTaskIdAndUserIdInput): Promise<UpdateResult>{
        try{
            return await this.taskRepository.createQueryBuilder()
            .update(TaskEntity)
            .set({
                task_title: updateTaskByTaskIdAndUserIdInput.task.taskTitle,
                task_description: updateTaskByTaskIdAndUserIdInput.task.taskDescription,
                task_status: updateTaskByTaskIdAndUserIdInput.task.taskStatus
            })
            .where("task_id = :taskId AND task_user = :taskUserId", {
                taskId: updateTaskByTaskIdAndUserIdInput.taskId,
                taskUserId: updateTaskByTaskIdAndUserIdInput.taskUserId
            })
            .execute();
        }catch(error){
            throw error;
        }
    }

    public async updateTaskDateConclusionByTaskIdAndUserId(updateTaskDateConclusionByTaskIdAndUserIdInput: IUpdateTaskDateConclusionByTaskIdAndUserIdInput): Promise<UpdateResult>{
        try{
            return await this.taskRepository.createQueryBuilder()
            .update(TaskEntity)
            .set({
                task_date_conclusion: updateTaskDateConclusionByTaskIdAndUserIdInput.taskDateConclusion
            })
            .where("task_id = :taskId AND task_user = :taskUserId", {
                taskId: updateTaskDateConclusionByTaskIdAndUserIdInput.taskId, 
                taskUserId: updateTaskDateConclusionByTaskIdAndUserIdInput.taskUserId
            })
            .execute();
        }catch(error){
            throw error;
        }
    }
}