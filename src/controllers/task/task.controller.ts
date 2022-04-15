import { Request, Response } from "express";

import { ITaskService, TaskService } from "../../services/task/task.service";

import { IInsertUserTaskInput, ISaveNewUserTaskBody, ISaveNewUserTaskOutput } from "../../interfaces/task/task-insert.interface";
import {
    IGetTaskByTaskIdAndUserIdInput,
    IGetTasksByUserIdInput,
    IGetUserTaskBody,
    IGetUserTaskOutput,
    IGetUserTasksBody,
    IGetUserTasksOutput
} from "../../interfaces/task/task-get.interface";
import { IDeleteTaskByTaskIdAndUserIdInput, IDeleteUserTaskBody, IDeleteUserTaskOutput } from "../../interfaces/task/task-delete.interface";
import { IUpdateTaskByTaskIdAndUserIdInput, IUpdateTaskDateConclusionByTaskIdAndUserIdInput, IUpdateUserTaskBody, IUpdateUserTaskDateConclusionBody, IUpdateUserTaskDateConclusionOutput, IUpdateUserTaskOutput } from "../../interfaces/task/task-update.interface";

import message from '../../utils/messages/index.json';
import taskMessage from '../../utils/messages/task/task.messages.json';

import { getDateTime } from "../../utils/dateTime/dateTime.util";

class TaskController {
    constructor(private taskService: ITaskService) {}

    public async getUserTasks(req: Request, res: Response) {
        let getUserTasksOutput: IGetUserTasksOutput;
        try{
            const { userJwt }: IGetUserTasksBody = req.body;

            const userToGetTasks: IGetTasksByUserIdInput = { taskUserId: userJwt.payload.userId };

            const getTasksByUserIdResponse = await this.taskService.getTasksByUserId(userToGetTasks);
            if(getTasksByUserIdResponse.length == 0){
                getUserTasksOutput = { tasksFound: false, message: taskMessage.no_tasks_fround };
                
                return res.status(200).send(getUserTasksOutput);
            }

            getUserTasksOutput = { tasksFound: true, tasks: getTasksByUserIdResponse, message: taskMessage.tasks_found };

            res.status(200).send(getUserTasksOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async getUserTask(req: Request, res: Response) {
        let getUserTaskOutput: IGetUserTaskOutput;
        try{
            const { taskId } = req.params;
            const { userJwt }: IGetUserTaskBody = req.body;

            const taskToGet: IGetTaskByTaskIdAndUserIdInput = { taskId: parseInt(taskId), taskUserId: userJwt.payload.userId };

            const getTaskByUserIdResponse = await this.taskService.getTaskByTaskIdAndUserId(taskToGet);
            if(getTaskByUserIdResponse == undefined){
                getUserTaskOutput = { taskFound: false, message: taskMessage.no_task_found };
                
                return res.status(200).send(getUserTaskOutput);
            }

            getUserTaskOutput = { taskFound: true, task: getTaskByUserIdResponse, message: taskMessage.task_found };

            res.status(200).send(getUserTaskOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async saveNewUserTask(req: Request, res: Response) {
        try{
            const { userJwt, taskTitle, taskDescription, taskStatus }: ISaveNewUserTaskBody = req.body;

            const now = getDateTime();

            const taskToInsert: IInsertUserTaskInput = {
                taskTitle: taskTitle,
                taskDescription: taskDescription,
                taskStatus: taskStatus,
                taskCreatedAt: now,
                taskUserId: userJwt.payload.userId
            }

            const insertUserTaskResponse = await this.taskService.insertUserTask(taskToInsert);

            const saveNewUserTaskOutput: ISaveNewUserTaskOutput = { 
                newTaskSaved: true,
                task: { taskId: insertUserTaskResponse.identifiers[0].task_id },
                message: taskMessage.new_task_saved
            };

            res.status(200).send(saveNewUserTaskOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async deleteUserTask(req: Request, res: Response){
        let deleteUserTaskOutput: IDeleteUserTaskOutput;
        try{
            const { taskId } = req.params;
            const { userJwt }: IDeleteUserTaskBody = req.body;

            const taskToDelete: IDeleteTaskByTaskIdAndUserIdInput = { taskId: parseInt(taskId), taskUserId: userJwt.payload.userId };

            const deleteTaskByTaskIdAndUserIdResponse = await this.taskService.deleteTaskByTaskIdAndUserId(taskToDelete);
            if(deleteTaskByTaskIdAndUserIdResponse.affected == 0){
                deleteUserTaskOutput = { taskFound: false, taskDeleted: false, message: taskMessage.no_task_found }

                return res.status(200).send(deleteUserTaskOutput);
            }

            deleteUserTaskOutput = { taskFound: true, taskDeleted: true, message: taskMessage.task_deleted }

            res.status(200).send(deleteUserTaskOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async updateUserTask(req: Request, res: Response){
        let updateUserTaskOutput: IUpdateUserTaskOutput;
        try{
            const { taskId } = req.params;
            const { userJwt, taskTitle, taskDescription, taskStatus }: IUpdateUserTaskBody = req.body;

            const taskToUpdate: IUpdateTaskByTaskIdAndUserIdInput = {
                taskId: parseInt(taskId),
                taskUserId: userJwt.payload.userId,
                task: {
                    taskTitle: taskTitle,
                    taskDescription: taskDescription,
                    taskStatus: taskStatus
                }
            };

            const updateTaskByTaskIdAndUserIdResponse = await this.taskService.updateTaskByTaskIdAndUserId(taskToUpdate);
            if(updateTaskByTaskIdAndUserIdResponse.affected == 0){
                updateUserTaskOutput = { taskFound: false, taskUpdated: false, message: taskMessage.no_task_found };

                return res.status(200).send(updateUserTaskOutput);
            }

            updateUserTaskOutput = { taskFound: true, taskUpdated: true, message: taskMessage.task_updated };

            return res.status(200).send(updateUserTaskOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async updateUserTaskDateConclusion(req: Request, res: Response){
        let updateUserTaskDateConclusionOutput: IUpdateUserTaskDateConclusionOutput;
        try{
            const { taskId } = req.params;
            const { userJwt, taskCompleted }: IUpdateUserTaskDateConclusionBody = req.body;

            const now = getDateTime();

            const taskToUpdate: IUpdateTaskDateConclusionByTaskIdAndUserIdInput = {
                taskId: parseInt(taskId),
                taskUserId: userJwt.payload.userId,
                taskDateConclusion: taskCompleted ? now : null
            };

            const updateTaskDateConclusionByTaskIdAndUserIdResponse = await this.taskService.updateTaskDateConclusionByTaskIdAndUserId(taskToUpdate);
            if(updateTaskDateConclusionByTaskIdAndUserIdResponse.affected == 0){
                updateUserTaskDateConclusionOutput = { taskFound: false, taskUpdated: false, message: taskMessage.no_task_found }

                return res.status(200).send(updateUserTaskDateConclusionOutput);
            }

            updateUserTaskDateConclusionOutput = { taskFound: true, taskUpdated: true, message: taskMessage.task_updated };

            res.status(200).send(updateUserTaskDateConclusionOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }
}

export const taskController = new TaskController(new TaskService());