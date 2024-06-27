import { CommonColumn } from 'src/common/column/common-column';
import { NewsLabel } from 'src/common/enum/enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsCategoryEntity } from './news-category.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity('news')
export class NewsEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'news_title',
    type: 'varchar',
    nullable: true,
  })
  news_title: string;

  @Column({
    name: 'news_description',
    type: 'varchar',
    nullable: true,
  })
  news_descriptioin: string;

  @Column({
    name: 'author',
    type: 'varchar',
    nullable: true,
  })
  author: string;

  @Column({
    name: 'source',
    type: 'varchar',
    nullable: true,
  })
  source: string;

  @Column({
    name: 'publish_date',
    type: 'varchar',
    nullable: true,
  })
  publish_date: Date;

  @Column({
    name: 'news_keywords',
    type: 'text',
    nullable: true,
  })
  news_keywords: string;

  @Column({
    name: 'is_training',
    type: 'boolean',
    default: false,
  })
  is_training: boolean;

  @Column({
    name: 'training_date',
    type: 'boolean',
    nullable: true,
  })
  training_date: Date;

  @Column({
    name: 'label',
    type: 'varchar',
    default: NewsLabel.NOT_TRAINED,
  })
  label: string;

  @Column({
    name: 'location',
    type: 'varchar',
    nullable: true,
  })
  location: string;

  @Column({
    name: 'validated_date',
    type: 'timestamp',
    default: null,
  })
  validated_date: Date;

  @Column({
    name: 'file_name',
    type: 'varchar',
    nullable: true,
  })
  url: string;

  @Column({
    name: 'is_debunking',
    type: 'boolean',
    nullable: true,
  })
  is_debunking: boolean;

  @Column({
    name: 'views_total',
    type: 'integer',
    default: 0,
  })
  views_total: number;

  @Column({
    name: 'file_name',
    type: 'varchar',
    nullable: true,
  })
  file_name: string;

  @Column({
    name: 'file_path',
    type: 'varchar',
    nullable: true,
  })
  file_path: string;

  @Column({
    name: 'news_category_id',
    type: 'varchar',
    nullable: true,
  })
  news_category_id: string;

  @ManyToOne(() => NewsCategoryEntity, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'news_category_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_news_category_id',
  })
  newsCategory: NewsCategoryEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  validated_by: UserEntity;
}
