import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'event_title',
    type: 'varchar',
  })
  event_title: string;

  @Column({
    name: 'event_description',
    type: 'varchar',
  })
  event_description: string;

  @Column({
    name: 'event_date',
    type: 'date',
  })
  event_date: Date;

  @Column({
    name: 'file_path',
    type: 'varchar',
  })
  file_path: string;

  @Column({
    name: 'file_name',
    type: 'varchar',
  })
  file_name: string;

  @Column({
    name: 'is_online',
    type: 'boolean',
  })
  is_online: boolean;

  @Column({
    name: 'link_meetings',
    type: 'varchar',
  })
  link_meetings: string;
}
