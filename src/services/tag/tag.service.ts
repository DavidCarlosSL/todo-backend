import { Connection, DeleteResult, getConnection, InsertResult, Repository, UpdateResult } from "typeorm";

import { ITag, TagEntity } from "../../entities/tag/tag.entity";

import { IGetTagByTagIdAndUserIdInput, IGetTagsByUserIdInput } from "../../interfaces/tag/tag-get.interface";
import { IInsertTagInput } from "../../interfaces/tag/tag-insert.interface";
import { IUpdateTagByTagIdAndUserIdInput as IUpdateTagByTagIdAndUserIdInput } from "../../interfaces/tag/tag-update.interface";
import { IDeleteTagByTagIdAndUserIdInput } from "../../interfaces/tag/tag-delete.interface";

export interface ITagService {
    insertTag(insertTagInput: IInsertTagInput): Promise<InsertResult>
    getTagsByUserId(getTagsByUserIdInput: IGetTagsByUserIdInput): Promise<ITag[]>
    getTagByTagIdAndUserId(getTagByTagIdAndUserIdInput: IGetTagByTagIdAndUserIdInput): Promise<ITag | undefined>
    updateTagByTagIdAndUserId(updateTagByTagIdAndUserIdInput: IUpdateTagByTagIdAndUserIdInput): Promise<UpdateResult>
    deleteTagByTagIdAndUserId(deleteTagByTagIdAndUserIdInput: IDeleteTagByTagIdAndUserIdInput): Promise<DeleteResult>
}

export class TagService implements ITagService {
    private pgsqlConnection: Connection;
    private tagRepository: Repository<TagEntity>;
    
    constructor(){ 
        this.pgsqlConnection = getConnection("pgsql");
        this.tagRepository = this.pgsqlConnection.getRepository(TagEntity);
    }

    public async insertTag(insertTagInput: IInsertTagInput): Promise<InsertResult>{
        try{
            return await this.tagRepository.createQueryBuilder()
            .insert()
            .into(TagEntity)
            .values({
                tag_name: insertTagInput.tagName,
                tag_color: insertTagInput.tagColor,
                tag_createdAt: insertTagInput.tagCreatedAt,
                tag_user: insertTagInput.tagUserId
            })
            .execute();
        }catch(error){
            throw error;
        }
    }

    public async getTagsByUserId(getTagsByUserIdInput: IGetTagsByUserIdInput): Promise<ITag[]>{
        try{
            return await this.tagRepository.createQueryBuilder()
            .where("tag_user = :tagUserId", { tagUserId: getTagsByUserIdInput.tagUserId })
            .getMany();
        }catch(error){
            throw error;
        }
    }

    public async getTagByTagIdAndUserId(getTagByTagIdAndUserIdInput: IGetTagByTagIdAndUserIdInput): Promise<ITag | undefined>{
        try{
            return await this.tagRepository.createQueryBuilder()
            .where("tag_id = :tagId AND tag_user = :tagUserId", { tagId: getTagByTagIdAndUserIdInput.tagId, tagUserId: getTagByTagIdAndUserIdInput.tagUserId })
            .getOne();
        }catch(error){
            throw error;
        }
    }

    public async updateTagByTagIdAndUserId(updateTagByTagIdAndUserIdInput: IUpdateTagByTagIdAndUserIdInput): Promise<UpdateResult>{
        try{
            return await this.tagRepository.createQueryBuilder()
            .update(TagEntity)
            .set({
                tag_name: updateTagByTagIdAndUserIdInput.tagName,
                tag_color: updateTagByTagIdAndUserIdInput.tagColor
            })
            .where("tag_id = :tagId AND tag_user = :tagUserId", { tagId: updateTagByTagIdAndUserIdInput.tagId, tagUserId: updateTagByTagIdAndUserIdInput.tagUserId })
            .execute();
        }catch(error){
            throw error;
        }
    }

    public async deleteTagByTagIdAndUserId(deleteTagByTagIdAndUserIdInput: IDeleteTagByTagIdAndUserIdInput): Promise<DeleteResult>{
        try{
            return await this.tagRepository.createQueryBuilder()
            .delete()
            .from(TagEntity)
            .where("tag_id = :tagId AND tag_user = :tagUserId", { tagId: deleteTagByTagIdAndUserIdInput.tagId, tagUserId: deleteTagByTagIdAndUserIdInput.tagUserId })
            .execute();
        }catch(error){
            throw error;
        }
    }
}