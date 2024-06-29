import { CommonColumn } from 'src/common/column/common-column';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EducationEventEntity } from './education-event.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity('event_registers')
export class EventRegisterEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => EducationEventEntity)
  @JoinColumn()
  educationEvent: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: string;
}
