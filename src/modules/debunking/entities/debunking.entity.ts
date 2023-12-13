import { CommonColumn } from 'src/common/column/common-column';
import { NewsEntity } from 'src/modules/news/entities/news.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('debunking')
export class DebunkingEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'evidence_description',
    type: 'varchar',
  })
  evidence_description: string;

  @Column({
    name: 'evidence_links',
    type: 'varchar',
  })
  evidence_links: string;

  @Column({
    name: 'file_path',
    type: 'varchar'
  })
  file_path: string;
  
  @Column({
    name: 'file_name',
    type: 'varchar'
  })
  file_name: string;
  
  @Column({
    name: 'news_id',
    type: 'varchar'
  })
  newsId: string;
  
  @Column({
    name: 'user_id',
    type: 'varchar'
  })
  userId: string;

  @ManyToOne(() => NewsEntity, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'news_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_news_id',
  })
  news: NewsEntity

  @ManyToOne(() => UserEntity, {
    onUpdate: 'CASCADE'
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_id'
  })
  user_id: UserEntity;
}
