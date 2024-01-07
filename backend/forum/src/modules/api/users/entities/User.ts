import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Role } from './Role';

@Entity({ tableName: 'app_user' })
export class User {
  @PrimaryKey()
  id!: string;

  @Property({ nullable: true })
  username!: string;

  @Property({ nullable: true })
  email!: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @ManyToOne({ entity: () => Role, ref: true, nullable: true })
  role?: Role;
}
