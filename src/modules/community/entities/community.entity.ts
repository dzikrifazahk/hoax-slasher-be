import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommunityStatus } from 'src/common/enum/enum';

@Entity({ name: 'community' })
export class CommunityEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true
  })
  description: string;

  @Column({
    name: 'status',
    type: 'varchar',
    default: CommunityStatus.ACTIVE
  })
  status: string;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: true
  })
  address: string;

  @Column({
    name: 'leader',
    type: 'varchar',
    nullable: true
  })
  leader: string;
}
