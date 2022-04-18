import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ITaskTag, TaskTagEntity } from "../task_tag/task_tag.entity";
import { IUser, UserEntity } from "../user/user.entity";

export interface ITag {
    tag_id: number;
    tag_name: string;
    tag_color: string;
    tag_createdAt: Date | string;
    tag_user: IUser | number;
}

export interface ITagId {
    tagId: number;
}

@Entity({name: "tag"})
export class TagEntity implements ITag {

    @PrimaryGeneratedColumn("increment", {name: "tag_id"})
    tag_id: number;

    @Column({name: "tag_name", type: "varchar", nullable: false, length: 30})
    tag_name: string;

    @Column({name: "tag_color", type: "varchar", nullable: false, length: 6})
    tag_color: string;

    @CreateDateColumn({name: "tag_createdAt", nullable: false})
    tag_createdAt: Date | string;

    @JoinColumn({name: "tag_user"})
    @ManyToOne(() => UserEntity, tag_user => tag_user.tags)
    tag_user: IUser | number;

    @OneToMany(() => TaskTagEntity, task_tag => task_tag.tag_id)
    tasks_tag: ITaskTag[];
}