import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../user/user.entity';

@Entity()
export class Movie extends BaseEntity {
  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  filePath: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;
}
