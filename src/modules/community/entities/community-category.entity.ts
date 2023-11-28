import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'community_category' })
export class CommunityCategoryEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'community_category_name',
    type: 'varchar',
    length: 255,
  })
  communityCategoryName: string;

  @Column({
    name: 'community_category_description',
    type: 'text',
  })
  communityCategoryDescription: string;

  @Column({
    name: 'alias_code',
    type: 'integer',
  })
  aliasCode: number;
}
