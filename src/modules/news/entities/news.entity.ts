import { CommonColumn } from 'src/common/column/common-column';
import { NewsLabel } from 'src/common/enum/enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NewsCategoryEntity } from './news-category.entity';

@Entity('news')
export class NewsEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'news_title',
    type: 'varchar',
  })
  news_title: string;

  @Column({
    name: 'news_description',
    type: 'varchar',
  })
  news_description: string;

  @Column({
    name: 'news_author',
    type: 'varchar',
  })
  news_author: string;

  @Column({
    name: 'news_source',
    type: 'varchar',
  })
  news_source: string;

  @Column({
    name: 'news_publish_date',
    type: 'varchar',
  })
  news_publish_date: Date;

  @Column({
    name: 'label',
    type: 'varchar',
    // default: NewsLabel.NOT_TRAINED,
  })
  label: NewsLabel;

  @Column({
    name: 'is_ambiguous',
    type: 'boolean',
    default: false,
  })
  is_ambiguous: boolean;

  @Column({
    name: 'is_training',
    type: 'boolean',
    default: false,
  })
  is_training: boolean;

  @Column({
    name: 'training_date',
    type: 'date',
    nullable: true
  })
  training_date: Date;

  @Column({
    name: 'file_name',
    type: 'varchar',
    nullable: true
  })
  file_name: string;

  @Column({
    name: 'file_path',
    type: 'varchar',
    nullable: true
  })
  file_path: string;

  @Column({
    name: 'counter_view',
    type: 'integer',
    default: 0,
  })
  counter_view: number;

  @Column({
    name: 'news_emotion',
    type: 'varchar',
    nullable: true
  })
  news_emotion: string;

  @Column({
    name: 'percentage',
    type: 'varchar',
    nullable: true
  })
  percentage: string;

  @Column({
    name: 'ambiguous_percentage',
    type: 'varchar',
    nullable: true
  })
  ambiguous_percentage: string;

  @Column({
    name: 'news_category_id',
    type: 'varchar',
  })
  newsCategoryId: string;

  @ManyToOne(() => NewsCategoryEntity, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'news_category_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_news_category_id',
  })
  newsCategory: NewsCategoryEntity;

}
