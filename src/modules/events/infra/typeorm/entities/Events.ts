import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Articles from '@modules/articles/infra/typeorm/entities/Articles';

@Entity('events')
class Events {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider: string;

  @Column('number')
  articleId: number;

  @OneToOne(() => Articles)
  @JoinColumn({ name: 'articleId' })
  article: Articles;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Events;
