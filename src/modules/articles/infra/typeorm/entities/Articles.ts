import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import Events from '@modules/events/infra/typeorm/entities/Events';
import Launches from '@modules/launches/infra/typeorm/entities/Launches';

@Entity('articles')
class Articles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column('timestamptz')
  publishedAt: Date;

  publishedAtFormatted: string;

  @OneToMany(type => Events, event => event.article)
  events: Events[];

  @OneToMany(type => Launches, launch => launch.article)
  launches: Launches[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Articles;
