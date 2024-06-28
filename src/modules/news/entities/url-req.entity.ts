import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('url_requests')
export default class UrlReqEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'url',
    type: 'varchar',
  })
  url: string;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  status: boolean;

  @Column({
    name: 'is_scrapping',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  is_scrapping: boolean;

  @Column({
    name: 'user_id',
    type: 'varchar',
  })
  user_id: string;
}
