import { UserRole } from 'src/common/enum/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'text',
  })
  password: string;

  @Column({
    name: 'need_change_password',
    type: 'boolean',
    default: false,
  })
  needChangePassword: boolean;

  @Column({
    name: 'role',
    type: 'varchar',
  })
  role: UserRole;

  @Column({
    name: 'token',
    nullable: true,
  })
  token?: string;

  @Column({
    name: 'user_status',
    nullable: true,
  })
  status?: string;

  @Column({
    name: 'file_path',
    nullable: true,
    type: 'varchar'
  })
  file_path: string

  @Column({
    name: 'file_name',
    nullable: true,
    type: 'varchar'
  })
  file_name: string

  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  @CreateDateColumn()
  created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
  })
  @UpdateDateColumn()
  updated_at: Date;

//   @Column({
//     name: 'counter_id',
//     nullable: true,
//     type: 'uuid',
//   })
//   counter_id : string

//   @OneToOne(() => CounterEntity, (counter) => counter.id_counter,
//   {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   }
//   )
//   @JoinColumn({ name: 'counter_id', referencedColumnName: 'id_counter', foreignKeyConstraintName: 'fk_user_counter'})
//   counter: CounterEntity;
}
