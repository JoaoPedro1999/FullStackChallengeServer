import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import { FindOptionsOrderValue } from 'typeorm';
import Articles from '../infra/typeorm/entities/Articles';
import IArticlesRepository from '../repositories/IArticlesRepository';
import { format } from 'date-fns';

interface Request {
  page?: string;
  orderBy?: FindOptionsOrderValue;
}

@injectable()
class ShowAllArticlesService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
  ) {}

  public async execute({
    page,
    orderBy = 'DESC',
  }: Request): Promise<Articles[]> {
    const articles = await this.articlesRepository.findAllArticles(
      page,
      orderBy,
    );

    const articlesFormatted = articles.map(article => {
      return {
        ...article,
        publishedAtFormatted: format(article.publishedAt, 'dd/MM/yyyy'),
      };
    });

    return articlesFormatted;
  }
}

export default ShowAllArticlesService;
