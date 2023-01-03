import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { User } from "./user.entity";

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: string;

  @Column({ type: "varchar", length: 20, default: null })
  title: string;

  @Column({ type: "text", default: null })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];
}
