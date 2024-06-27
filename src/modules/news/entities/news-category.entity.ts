import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news_category')
export class NewsCategoryEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
  })
  description: string;

  @Column({
    name: 'alias_code',
    type: 'integer',
    nullable: true,
  })
  alias_code: number;
}
