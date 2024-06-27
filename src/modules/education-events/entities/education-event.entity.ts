import { IsString } from 'class-validator';
import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventCommentsEntity } from './event-comments.entity';

@Entity('education_events')
export class EducationEventEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  @IsString()
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
  })
  @IsString()
  description: string;

  @Column({
    name: 'event_date',
    type: 'timestamp',
  })
  event_date: Date;

  @Column({
    name: 'is_online',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  is_online: boolean;

  @Column({
    name: 'links',
    type: 'varchar',
    nullable: true,
  })
  links: string;

  @Column({
    name: 'is_training',
    type: 'timestamp',
    nullable: true,
  })
  reminder_date: Date;

  @Column({
    name: 'file_path',
    type: 'varchar',
    nullable: true,
  })
  file_path: string;

  @Column({
    name: 'file_name',
    type: 'varchar',
    nullable: true,
  })
  file_name: string;

  @OneToMany(() => EventCommentsEntity, (comment) => comment.educationEvent, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: EventCommentsEntity[];
}
