import { IsString } from 'class-validator';
import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EducationEventEntity } from './education-event.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity('event_comments')
export class EventCommentsEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'message',
    type: 'varchar',
  })
  @IsString()
  message: string;

  @ManyToOne(() => EducationEventEntity, (e) => e.comments)
  educationEvent: string;

  @ManyToOne(() => UserEntity, (u) => u.comments)
  user: string;
}
