import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Blog } from "./blog.entity";
import { BaseEntity } from "./base.entity";

@Entity({name: "categories"})
export class Category extends BaseEntity {

  @Column({ type: "varchar", length: 255 })
  name: string;


  @ManyToMany(() => Blog, (blog) => blog.categories, { cascade: true })
  blogs: Blog[];
}
