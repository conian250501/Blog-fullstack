import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Blog } from "./blog.entity";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  content: string;

  @ManyToMany(() => Blog, { cascade: true })
  @JoinTable()
  blogs: Blog[];
}
