import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news_not_labeled')
export class NewsNotLabeledEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'news_title',
    type: 'varchar',
  })
  newsTitle: string;
  @Column({
    name: 'news_description',
    type: 'varchar',
  })
  newsDescription: string;

  @Column({
    name: 'news_author',
    type: 'varchar',
  })
  newsAuthor: string;

  @Column({
    name: 'news_source',
    type: 'varchar',
  })
  newsSource: string;

  @Column({
    name: 'news_publish_date',
    type: 'varchar',
  })
  newsPublishDate: Date;

  @Column({
    name: 'label',
    type: 'number',
  })
  label: number;

  @Column({
    name: 'is_training',
    type: 'boolean',
  })
  isTraining: boolean;

}
