import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: null })
  avatar!: string;

  @Column({ default: null })
  email!: string;

  @Column({ default: null })
  name!: string;

  @Column({ default: null })
  password!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;
}
