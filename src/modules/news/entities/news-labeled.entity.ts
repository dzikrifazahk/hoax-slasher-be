import { NewsLabel } from 'src/common/enum/enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsNotLabeledEntity } from './news-not-labeled.entity';
import { CommonColumn } from 'src/common/column/common-column';

@Entity('news_labeled')
export class NewsLabeledEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'label',
    type: 'varchar',
  })
  label: NewsLabel;

  @Column({
    name: 'training_date',
    type: 'date',
  })
  trainingDate: Date;

  @Column({
    name: 'model_name',
    type: 'varchar',
  })
  modelName: string;

  @Column({
    name: 'accuracy',
    type: 'integer',
  })
  accuracy: number;

  @Column({
    name: 'news_not_labeled_id',
    type: 'varchar',
  })
  newsNotLabeledId: string;

  @OneToOne(() => NewsNotLabeledEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'news_not_labeled_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_news_not_labeled_id',
  })
  newsNotLabeled: NewsNotLabeledEntity;
}
