import Articles from '../infra/typeorm/entities/Articles';
import ICreateArticleDTO from '../dtos/ICreateArticleDTO';

export default interface IArticlesRepository {
  findArticleById(id: string): Promise<Articles | undefined>;
  findArticlesByKeyword(keyword: string): Promise<Articles[] | undefined>;
  findAllArticles(page?: string): Promise<Articles[]>;
  create(data: ICreateArticleDTO): Promise<Articles>;
  save(data: Articles): Promise<Articles>;
  delete(id: string): Promise<void>;
}
