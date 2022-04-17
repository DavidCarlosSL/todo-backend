import { Request, Response } from "express";

import {
    IGetTagBody,
    IGetTagByTagIdAndUserIdInput,
    IGetTagOutput,
    IGetTagsBody,
    IGetTagsByUserIdInput,
    IGetTagsOutput
} from "../../interfaces/tag/tag-get.interface";
import { IInsertTagInput, ISaveNewTagBody, ISaveNewTagOutput } from "../../interfaces/tag/tag-insert.interface";
import { IUpdateTagBody, IUpdateTagByTagIdAndUserIdInput, IUpdateTagOutput } from "../../interfaces/tag/tag-update.interface";
import { IDeleteTagBody, IDeleteTagByTagIdAndUserIdInput, IDeleteTagOutput } from "../../interfaces/tag/tag-delete.interface";

import { ITagService, TagService } from "../../services/tag/tag.service";

import { getDateTime } from "../../utils/dateTime/dateTime.util";

import message from "../../utils/messages/index.json";
import tagMessage from "../../utils/messages/tag/tag.messages.json";

class TagController {
    constructor(private tagService: ITagService){}

    public async saveNewTag(req: Request, res: Response){
        try{
            const { userJwt, tagName, tagColor }: ISaveNewTagBody = req.body;

            const now = getDateTime();

            const tagToSave: IInsertTagInput = {
                tagName: tagName,
                tagColor: tagColor,
                tagCreatedAt: now,
                tagUserId: userJwt.payload.userId
            };

            const insertTagResponse = await this.tagService.insertTag(tagToSave);

            const saveNewTagOutput: ISaveNewTagOutput = {
                newTagSaved: true,
                tag: { tagId: insertTagResponse.identifiers[0].tag_id },
                message: tagMessage.new_tag_saved
            };

            res.status(201).send(saveNewTagOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async getTags(req: Request, res: Response){
        let getTagsOutput: IGetTagsOutput;
        try{
            const { userJwt }: IGetTagsBody = req.body;

            const userToGetTags: IGetTagsByUserIdInput = { tagUserId: userJwt.payload.userId };

            const getTagsByUserIdResponse = await this.tagService.getTagsByUserId(userToGetTags);
            if(getTagsByUserIdResponse.length == 0){
                getTagsOutput = { tagsFound: false, message: tagMessage.no_tags_found };

                return res.status(200).send(getTagsOutput);
            }

            getTagsOutput = { tagsFound: true, tags: getTagsByUserIdResponse, message: tagMessage.tags_found };

            res.status(200).send(getTagsOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async getTag(req: Request, res: Response){
        let getTagOutput: IGetTagOutput;
        try{
            const { tagId } = req.params;
            const { userJwt }: IGetTagBody = req.body;

            const tagToGet: IGetTagByTagIdAndUserIdInput = { tagId: parseInt(tagId), tagUserId: userJwt.payload.userId };

            const getTagByTagIdAndUserIdResponse = await this.tagService.getTagByTagIdAndUserId(tagToGet);
            if(getTagByTagIdAndUserIdResponse == undefined){
                getTagOutput = { tagFound: false, message: tagMessage.no_tag_found };

                return res.status(200).send(getTagOutput);
            }

            getTagOutput = { tagFound: true, tag: getTagByTagIdAndUserIdResponse, message: tagMessage.tag_found };

            res.status(200).send(getTagOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async updateTag(req: Request, res: Response){
        let updateTagOutput: IUpdateTagOutput;
        try{
            const { tagId } = req.params;
            const { userJwt, tagName, tagColor }: IUpdateTagBody = req.body;

            const tagToUpdate: IUpdateTagByTagIdAndUserIdInput = {
                tagId: parseInt(tagId),
                tagUserId: userJwt.payload.userId,
                tagName: tagName,
                tagColor: tagColor
            };

            const updateTagByTagIdAndUserIdResponse = await this.tagService.updateTagByTagIdAndUserId(tagToUpdate);
            if(updateTagByTagIdAndUserIdResponse.affected == 0){
                updateTagOutput = { tagFound: false, tagUpdated: false, message: tagMessage.no_tag_found };

                return res.status(200).send(updateTagOutput);
            }
            
            updateTagOutput = { tagFound: true, tagUpdated: true, message: tagMessage.tag_updated };

            res.status(200).send(updateTagOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async deleteTag(req: Request, res: Response){
        let deleteTagOutput: IDeleteTagOutput;
        try{
            const { tagId } = req.params;
            const { userJwt }: IDeleteTagBody = req.body;

            const tagToDelete: IDeleteTagByTagIdAndUserIdInput = { tagId: parseInt(tagId), tagUserId: userJwt.payload.userId };

            const deleteTagByTagIdAndUserIdResponse = await this.tagService.deleteTagByTagIdAndUserId(tagToDelete);
            if(deleteTagByTagIdAndUserIdResponse.affected == 0){
                deleteTagOutput = { tagFound: false, tagDeleted: false, message: tagMessage.no_tag_found };

                return res.status(200).send(deleteTagOutput);
            }

            deleteTagOutput = { tagFound: true, tagDeleted: true, message: tagMessage.tag_deleted };

            res.status(200).send(deleteTagOutput);
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }
}

export const tagController = new TagController(new TagService());