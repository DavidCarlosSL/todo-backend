import { Request, Response } from "express";

import { ITaskService, TaskService } from "../../services/task/task.service";

import { IInsertTaskInput, ISaveNewTaskBody, ISaveNewTaskOutput } from "../../interfaces/task/task-insert.interface";
import {
    IGetTaskByTaskIdAndUserIdInput,
    IGetTasksByUserIdInput,
    IGetTaskBody,
    IGetTaskOutput,
    IGetTasksBody,
    IGetTasksOutput
} from "../../interfaces/task/task-get.interface";
import { IDeleteTaskByTaskIdAndUserIdInput, IDeleteTaskBody, IDeleteTaskOutput } from "../../interfaces/task/task-delete.interface";
import { IUpdateTaskByTaskIdAndUserIdInput, IUpdateTaskDateConclusionByTaskIdAndUserIdInput, IUpdateTaskBody, IUpdateTaskDateConclusionBody, IUpdateTaskDateConclusionOutput, IUpdateTaskOutput } from "../../interfaces/task/task-update.interface";

import message from '../../utils/messages/index.json';
import taskMessage from '../../utils/messages/task/task.messages.json';

import { getDateTime } from "../../utils/dateTime/dateTime.util";

class TaskController {
    constructor(private taskService: ITaskService) {}

    public async getTasks(req: Request, res: Response) {
        let getTasksOutput: IGetTasksOutput;
        try{
            const { userJwt }: IGetTasksBody = req.body;

            const userToGetTasks: IGetTasksByUserIdInput = { taskUserId: userJwt.payload.userId };

            const getTasksByUserIdResponse = await this.taskService.getTasksByUserId(userToGetTasks);
            if(getTasksByUserIdResponse.length == 0){
                getTasksOutput = { tasksFound: false, message: taskMessage.no_tasks_fround };
                
                return res.status(200).send(getTasksOutput);
            }

            getTasksOutput = { tasksFound: true, tasks: getTasksByUserIdResponse, message: taskMessage.tasks_found };

            res.status(200).send(getTasksOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async getTask(req: Request, res: Response) {
        let getTaskOutput: IGetTaskOutput;
        try{
            const { taskId } = req.params;
            const { userJwt }: IGetTaskBody = req.body;

            const taskToGet: IGetTaskByTaskIdAndUserIdInput = { taskId: parseInt(taskId), taskUserId: userJwt.payload.userId };

            const getTaskByTaskIdAndUserIdResponse = await this.taskService.getTaskByTaskIdAndUserId(taskToGet);
            if(getTaskByTaskIdAndUserIdResponse == undefined){
                getTaskOutput = { taskFound: false, message: taskMessage.no_task_found };
                
                return res.status(200).send(getTaskOutput);
            }

            getTaskOutput = { taskFound: true, task: getTaskByTaskIdAndUserIdResponse, message: taskMessage.task_found };

            res.status(200).send(getTaskOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async saveNewTask(req: Request, res: Response) {
        try{
            const { userJwt, taskTitle, taskDescription, taskStatus }: ISaveNewTaskBody = req.body;

            const now = getDateTime();

            const taskToInsert: IInsertTaskInput = {
                taskTitle: taskTitle,
                taskDescription: taskDescription,
                taskStatus: taskStatus,
                taskCreatedAt: now,
                taskUserId: userJwt.payload.userId
            }

            const insertTaskResponse = await this.taskService.insertTask(taskToInsert);

            const saveNewTaskOutput: ISaveNewTaskOutput = { 
                newTaskSaved: true,
                task: { taskId: insertTaskResponse.identifiers[0].task_id },
                message: taskMessage.new_task_saved
            };

            res.status(201).send(saveNewTaskOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async deleteTask(req: Request, res: Response){
        let deleteTaskOutput: IDeleteTaskOutput;
        try{
            const { taskId } = req.params;
            const { userJwt }: IDeleteTaskBody = req.body;

            const taskToDelete: IDeleteTaskByTaskIdAndUserIdInput = { taskId: parseInt(taskId), taskUserId: userJwt.payload.userId };

            const deleteTaskByTaskIdAndUserIdResponse = await this.taskService.deleteTaskByTaskIdAndUserId(taskToDelete);
            if(deleteTaskByTaskIdAndUserIdResponse.affected == 0){
                deleteTaskOutput = { taskFound: false, taskDeleted: false, message: taskMessage.no_task_found }

                return res.status(200).send(deleteTaskOutput);
            }

            deleteTaskOutput = { taskFound: true, taskDeleted: true, message: taskMessage.task_deleted }

            res.status(200).send(deleteTaskOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async updateTask(req: Request, res: Response){
        let updateTaskOutput: IUpdateTaskOutput;
        try{
            const { taskId } = req.params;
            const { userJwt, taskTitle, taskDescription, taskStatus }: IUpdateTaskBody = req.body;

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
                updateTaskOutput = { taskFound: false, taskUpdated: false, message: taskMessage.no_task_found };

                return res.status(200).send(updateTaskOutput);
            }

            updateTaskOutput = { taskFound: true, taskUpdated: true, message: taskMessage.task_updated };

            return res.status(200).send(updateTaskOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async updateTaskDateConclusion(req: Request, res: Response){
        let updateTaskDateConclusionOutput: IUpdateTaskDateConclusionOutput;
        try{
            const { taskId } = req.params;
            const { userJwt, taskCompleted }: IUpdateTaskDateConclusionBody = req.body;

            const now = getDateTime();

            const taskToUpdate: IUpdateTaskDateConclusionByTaskIdAndUserIdInput = {
                taskId: parseInt(taskId),
                taskUserId: userJwt.payload.userId,
                taskDateConclusion: taskCompleted ? now : null
            };

            const updateTaskDateConclusionByTaskIdAndUserIdResponse = await this.taskService.updateTaskDateConclusionByTaskIdAndUserId(taskToUpdate);
            if(updateTaskDateConclusionByTaskIdAndUserIdResponse.affected == 0){
                updateTaskDateConclusionOutput = { taskFound: false, taskUpdated: false, message: taskMessage.no_task_found }

                return res.status(200).send(updateTaskDateConclusionOutput);
            }

            updateTaskDateConclusionOutput = { taskFound: true, taskUpdated: true, message: taskMessage.task_updated };

            res.status(200).send(updateTaskDateConclusionOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }
}

export const taskController = new TaskController(new TaskService());