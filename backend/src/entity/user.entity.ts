import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Blog } from "./blog.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ default: null })
  avatar: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  verify: boolean;

  @Column({ default: null })
  token: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
