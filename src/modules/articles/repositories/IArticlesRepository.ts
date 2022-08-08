import Articles from '../infra/typeorm/entities/Articles';
import ICreateArticleDTO from '../dtos/ICreateArticleDTO';
import { FindOptionsOrderValue } from 'typeorm';

export default interface IArticlesRepository {
  findArticleById(id: string): Promise<Articles | undefined>;
  findArticlesByKeyword(keyword: string): Promise<Articles[] | undefined>;
  findAllArticles(
    page?: string,
    orderBy?: FindOptionsOrderValue,
  ): Promise<Articles[]>;
  create(data: ICreateArticleDTO): Promise<Articles>;
  save(data: Articles): Promise<Articles>;
  delete(id: string): Promise<void>;
}
