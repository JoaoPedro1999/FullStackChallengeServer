import Articles from '../infra/typeorm/entities/Articles';
import ICreateArticleDTO from '../dtos/ICreateArticleDTO';

import { PrismaPromise } from '@prisma/client';

export default interface IArticlesRepository {
  findArticleById(id: number): Promise<Articles | undefined>;
  findArticlesByKeyword(keyword: string): Promise<Articles[] | undefined>;
  findAllArticles(page?: number): Promise<Articles[]>;
  create(data: ICreateArticleDTO): Promise<Articles>;
  save(user: Articles): Promise<Articles>;
}
