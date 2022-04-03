import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { IUser, UserEntity } from "../user/user.entity";

export interface ITask {
    task_id: number;
    task_title: string;
    task_description: string;
    task_status: TaskStatus;
    task_date_conclusion: Date | string;
    task_createdAt: Date | string;
    task_user: IUser;
}

enum TaskStatus {
    concluded = "Concluded",
    canceled = "Canceled",
    ongoing = "Ongoing",
    standby = "Standby"
}

@Entity({name: "task"})
export class TaskEntity implements ITask {
    
    @PrimaryGeneratedColumn("increment", {name: "task_id"})
    task_id: number;
    
    @Column({name: "task_title", type: "varchar", nullable: false, length: 60})
    task_title: string;

    @Column({name: "task_description", type: "varchar", nullable: true, length: 300})
    task_description: string;

    @Column({name: "task_status", type: "enum", enum: TaskStatus, default: TaskStatus.ongoing, nullable: false})
    task_status: TaskStatus;
    
    @CreateDateColumn({name: "task_date_conclusion", nullable: false})
    task_date_conclusion: Date | string;

    @CreateDateColumn({name: "task_createdAt", nullable: false})
    task_createdAt: Date | string;

    @JoinColumn({name: "task_user"})
    @ManyToOne(() => UserEntity, task_user => task_user.tasks)
    task_user: IUser;
}