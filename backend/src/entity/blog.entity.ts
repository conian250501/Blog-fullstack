import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: string;

  @Column({ type: "varchar", length: 20, default: null })
  title: string;

  @Column({ type: "varchar", default: null })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;
}
