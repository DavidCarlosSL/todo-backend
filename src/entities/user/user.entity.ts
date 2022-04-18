import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ITask, TaskEntity } from "../task/task.entity";
import { ITag, TagEntity } from "../tag/tag.entity";

export interface IUser {
    user_id: number;
    user_name: string;
    user_email: string;
    user_password: string;
    user_createdAt: Date | string;
    tasks: ITask[];
}

@Entity({name: "user"})
export class UserEntity implements IUser {
    
    @PrimaryGeneratedColumn("increment", {name: "user_id"})
    user_id: number;
    
    @Column({name: "user_name", type: "varchar", nullable: false, length: 35})
    user_name: string;
    
    @Column({name: "user_email", type: "varchar", nullable: false, unique: true, length: 60})
    user_email: string;
    
    @Column({name: "user_password", type: "varchar", nullable: false})
    user_password: string;
    
    @CreateDateColumn({name: "user_createdAt", nullable: false})
    user_createdAt: Date | string;

    @OneToMany(() => TaskEntity, task => task.task_user)
    tasks: ITask[];

    @OneToMany(() => TagEntity, tag => tag.tag_user)
    tags: ITag[];
}