import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ITag, TagEntity } from "../tag/tag.entity";
import { ITask, TaskEntity } from "../task/task.entity";

export interface ITaskTag {
    task_tag_id: number;
    task_id: ITask | number;
    tag_id: ITag | number;
}

@Entity({name: "task_tag"})
export class TaskTagEntity implements ITaskTag {

    @PrimaryGeneratedColumn("increment", {name: "task_tag_id"})
    task_tag_id: number;

    @JoinColumn({name: "task_id"})
    @ManyToOne(() => TaskEntity, task => task.task_tags)
    task_id: ITask | number;

    @JoinColumn({name: "tag_id"})
    @ManyToOne(() => TagEntity, tag => tag.tasks_tag)
    tag_id: ITag | number;
}