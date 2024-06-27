import { CommonColumn } from 'src/common/column/common-column';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trusted_source')
export class TrustedSourceEntity extends CommonColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'company_name',
    type: 'varchar',
  })
  company_name: string;
  
  @Column({
    name: 'company_description',
    type: 'varchar',
    nullable: true
  })
  company_description: string;

  @Column({
    name: 'company_email',
    type: 'varchar',
    nullable: true
  })
  company_email: string;
}
