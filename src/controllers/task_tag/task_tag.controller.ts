import { Request, Response } from "express";

import { ITaskTagService, TaskTagService } from "../../services/task_tag/task_tag.service";
import { ITaskService, TaskService } from "../../services/task/task.service";
import { ITagService, TagService } from "../../services/tag/tag.service";

import { ITagId } from "../../entities/tag/tag.entity";

import { IInsertTaskTagInput, ISaveNewTaskTagBody, ISaveNewTaskTagOutput } from "../../interfaces/task_tag/task_tag-insert.interface";
import { IGetTaskByTaskIdAndUserIdInput } from "../../interfaces/task/task-get.interface";
import { IDeleteTaskTagBody, IDeleteTasktagInput, IDeleteTaskTagOutput } from "../../interfaces/task_tag/task_tag-delete.interface";

import message from "../../utils/messages/index.json";
import taskTagMessage from "../../utils/messages/task_tag/task_tag.messages.json";

class TaskTagController {
    constructor(private taskTagService: ITaskTagService, private taskService: ITaskService, private tagService: ITagService) {}

    public async saveNewTaskTag(req: Request, res: Response) {
        let saveNewTaskTagOutput: ISaveNewTaskTagOutput;
        try{
            const { userJwt, taskId, tags }: ISaveNewTaskTagBody = req.body;

            const taskToGet: IGetTaskByTaskIdAndUserIdInput = { taskId: taskId, taskUserId: userJwt.payload.userId };

            const getTaskByTaskIdAndUserIdResponse = await this.taskService.getTaskByTaskIdAndUserId(taskToGet);
            if(getTaskByTaskIdAndUserIdResponse == undefined){
                saveNewTaskTagOutput = { taskFound: false, newTagsAssociated: false, message: taskTagMessage.no_task_found};

                return res.status(200).send(saveNewTaskTagOutput);
            }

            const tagsNotFound: ITagId[] = [];
            const tagsAlreadyAssociated: ITagId[] = [];
            const taskTagsToSave: IInsertTaskTagInput[] = [];

            await Promise.all(tags.map(async (tag) => {
                const getTagByTagIdAndUserIdResponse = await this.tagService.getTagByTagIdAndUserId({tagId: tag.tagId, tagUserId: userJwt.payload.userId});
                if(getTagByTagIdAndUserIdResponse == undefined){
                    tagsNotFound.push(tag);
                    return;
                }

                const getTaskTagByTaskIdAndTagIdResponse = await this.taskTagService.getTaskTagByTaskIdAndTagId({taskId: taskId, tagId: tag.tagId});
                if(getTaskTagByTaskIdAndTagIdResponse){
                    tagsAlreadyAssociated.push(tag);
                    return;
                }

                taskTagsToSave.push({task_id: taskId, tag_id: tag.tagId});
            }));

            if(tagsNotFound.length > 0){
                saveNewTaskTagOutput = {
                    taskFound: true, 
                    allTagsFound: false, 
                    tagsNotFound: tagsNotFound, 
                    newTagsAssociated: false, 
                    message: taskTagMessage.not_all_tags_was_found
                };

                return res.status(200).send(saveNewTaskTagOutput);
            }

            if(tagsAlreadyAssociated.length > 0){
                saveNewTaskTagOutput = {
                    taskFound: true,
                    allTagsFound: true,
                    hasTagsAlreadyAssociated: true,
                    tagsAlreadyAssociated: tagsAlreadyAssociated,
                    newTagsAssociated: false,
                    message: taskTagMessage.task_tags_already_associated
                };

                return res.status(200).send(saveNewTaskTagOutput);
            }

            await this.taskTagService.insertTaskTag(taskTagsToSave);
            
            saveNewTaskTagOutput = { taskFound: true, allTagsFound: true, newTagsAssociated: true, message: taskTagMessage.task_tags_associated };

            res.status(201).send(saveNewTaskTagOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async deleteTaskTag(req: Request, res: Response){
        let deleteTaskTagOutput: IDeleteTaskTagOutput;
        try{
            const { userJwt, taskId, tags }: IDeleteTaskTagBody = req.body;

            const taskToGet: IGetTaskByTaskIdAndUserIdInput = { taskId: taskId, taskUserId: userJwt.payload.userId };

            const getTaskByTaskIdAndUserIdResponse = await this.taskService.getTaskByTaskIdAndUserId(taskToGet);
            if(getTaskByTaskIdAndUserIdResponse == undefined){
                deleteTaskTagOutput = { taskFound: false, tagsDissociated: false, message: taskTagMessage.no_task_found};

                return res.status(200).send(deleteTaskTagOutput);
            }

            const tagsNotFound: ITagId[] = [];
            const taskTagsAssociationNotFound: ITagId[] = [];
            const taskTagIdsToDelete: number[] = [];

            await Promise.all(tags.map(async (tag) => {
                const getTagByTagIdAndUserIdResponse = await this.tagService.getTagByTagIdAndUserId({tagId: tag.tagId, tagUserId: userJwt.payload.userId});
                if(getTagByTagIdAndUserIdResponse == undefined){
                    tagsNotFound.push(tag);
                    return;
                }

                const getTaskTagByTaskIdAndTagIdResponse = await this.taskTagService.getTaskTagByTaskIdAndTagId({taskId: taskId, tagId: tag.tagId});
                if(getTaskTagByTaskIdAndTagIdResponse != undefined){
                    taskTagIdsToDelete.push(getTaskTagByTaskIdAndTagIdResponse.task_tag_id);
                }else
                    taskTagsAssociationNotFound.push(tag);
            }));

            if(tagsNotFound.length > 0){
                deleteTaskTagOutput = {
                    taskFound: true,
                    allTagsFound: false,
                    tagsNotFound: tagsNotFound,
                    tagsDissociated: false,
                    message: taskTagMessage.not_all_tags_was_found
                };

                return res.status(200).send(deleteTaskTagOutput);
            }

            if(taskTagsAssociationNotFound.length > 0){
                deleteTaskTagOutput = {
                    taskFound: true,
                    allTagsFound: true,
                    allTaskTagsAssociationFound: false,
                    taskTagsAssociationNotFound: taskTagsAssociationNotFound,
                    tagsDissociated: false,
                    message: taskTagMessage.not_all_task_tags_association_were_found
                };

                return res.status(200).send(deleteTaskTagOutput);
            }

            const taskTagsToDelete: IDeleteTasktagInput = { taskTagIds: taskTagIdsToDelete };

            await this.taskTagService.deleteTaskTag(taskTagsToDelete);

            deleteTaskTagOutput = {
                taskFound: true,
                allTagsFound: true,
                allTaskTagsAssociationFound: true,
                tagsDissociated: true,
                message: taskTagMessage.tags_dissociated
            };

            res.status(200).send(deleteTaskTagOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }
}

export const taskTagController = new TaskTagController(new TaskTagService(), new TaskService(), new TagService());