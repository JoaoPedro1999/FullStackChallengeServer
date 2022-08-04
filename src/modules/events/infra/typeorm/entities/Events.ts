import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Articles from '@modules/articles/infra/typeorm/entities/Articles';

@Entity('events')
class Events {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider: string;

  @Column('number')
  articleId: string;

  @ManyToOne(() => Articles)
  @JoinColumn({ name: 'articleId' })
  article: Articles;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Events;
