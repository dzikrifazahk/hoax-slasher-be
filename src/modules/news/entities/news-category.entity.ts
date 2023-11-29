import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news_category')
export class NewsCategoryEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'category_name',
    type: 'varchar',
  })
  newsCategoryName: string;

  @Column({
    name: 'category_description',
    type: 'varchar',
  })
  newsCategoryDescription: string;

  @Column({
    name: 'alias_code',
    type: 'integer',
  })
  aliasCode: number;

}
