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

@Entity('launches')
class Launches {
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

export default Launches;
