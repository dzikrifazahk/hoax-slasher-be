import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommunityCategoryEntity } from './community-category.entity';
import { CommunityStatus } from 'src/common/enum/enum';

@Entity({ name: 'community' })
export class CommunityEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'community_name',
    type: 'varchar',
    length: 255,
  })
  communityName: string;

  @Column({
    name: 'community_description',
    type: 'text',
  })
  communityDescription: string;

  @Column({
    name: 'community_status',
    type: 'varchar',
    default: CommunityStatus.ACTIVE
  })
  communityStatus: string;

  @Column({
    name: 'community_address',
    type: 'varchar',
  })
  communityAddress: string;

  @Column({
    name: 'community_category_id',
    type: 'uuid',
    nullable: true,
  })
  community_category_id: string;

  @ManyToOne(() => CommunityCategoryEntity, (community_category) => community_category.community)
  @JoinColumn({ name: 'community_category_id' })
  communityCategory: CommunityCategoryEntity;
}
