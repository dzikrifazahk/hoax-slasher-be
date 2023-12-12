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
    type: 'varchar',
    default: NewsLabel.NOT_TRAINED,
  })
  label: NewsLabel;

  @Column({
    name: 'is_ambiguous',
    type: 'boolean',
    default: false,
  })
  isAmbiguous: boolean;

  @Column({
    name: 'is_training',
    type: 'boolean',
    default: false,
  })
  isTraining: boolean;

  @Column({
    name: 'is_training_date',
    type: 'boolean',
    nullable: true
  })
  trainingDate: Date;

  @Column({
    name: 'file_name',
    type: 'varchar',
    nullable: true
  })
  fileName: string;

  @Column({
    name: 'file_path',
    type: 'varchar',
    nullable: true
  })
  filePath: string;

  @Column({
    name: 'counter_view',
    type: 'integer',
    default: 0,
  })
  counterView: number;

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
