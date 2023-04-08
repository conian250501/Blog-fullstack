import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Blog } from "./blog.entity";
import { BaseEntity } from './base.entity';

@Entity({name: "users"})
export class User extends BaseEntity {


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


  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
