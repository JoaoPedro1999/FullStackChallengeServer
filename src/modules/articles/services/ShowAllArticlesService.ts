import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import Articles from '../infra/typeorm/entities/Articles';
import IArticlesRepository from '../repositories/IArticlesRepository';

interface Request {
  page?: string;
}

@injectable()
class ShowAllArticlesService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
  ) {}

  public async execute({ page }: Request): Promise<Articles[]> {
    const articles = await this.articlesRepository.findAllArticles(page);

    return articles;
  }
}

export default ShowAllArticlesService;