import { Transform, TransformFnParams } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn('binary', { length: 16, nullable: false })
  @Transform(({ value }: TransformFnParams): string => value ? value.toString('hex') : null, { toPlainOnly: true }) // string to hex decimal
  @Transform(({ value }: TransformFnParams): Buffer => value ? Buffer.from(value, 'hex') : null, { toClassOnly: true })
  id: Buffer;

  @Column('varchar', { nullable: false, length: 150 })
  name: string;

  @Column('varchar', { nullable: false, unique: true, length: 255 })
  email: string;

  @Column('date', { name: 'birthdate' })
  birthDate: Date;

  @Column('varchar', { name: 'phone_number', length: 100 })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, default: null })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;
}

