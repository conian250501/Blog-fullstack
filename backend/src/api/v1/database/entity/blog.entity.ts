import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity({name: "blogs"})
export class Blog extends BaseEntity {
  @Column({ type: "varchar", length: 20, default: null })
  title: string;

  @Column({ type: "text", default: null })
  content: string;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToMany(() => Category, (category) => category.blogs)
  @JoinTable({
    name: "blogs_categories",
    joinColumn: {
      name: "blog",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "category",
      referencedColumnName: "id",
    },
  })
  categories: Category[];
}
