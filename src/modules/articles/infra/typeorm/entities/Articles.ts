import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Events from '@modules/events/infra/typeorm/entities/Events';
import Launches from '@modules/launches/infra/typeorm/entities/Launches';

@Entity('articles')
class Articles {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('boolean')
  featured: boolean;

  @Column('boolean')
  title: string;

  @Column('boolean')
  url: string;

  @Column('boolean')
  imageUrl: string;

  @Column('boolean')
  newsSite: string;

  @Column('boolean')
  summary: string;

  @Column('datetime')
  publishedAt: Date;

  @OneToOne(() => Events)
  events: Events;

  @OneToOne(() => Launches)
  launches: Launches;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Articles;
