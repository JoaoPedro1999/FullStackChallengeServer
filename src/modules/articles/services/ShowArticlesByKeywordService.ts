import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Articles from '../infra/typeorm/entities/Articles';
import IArticlesRepository from '../repositories/IArticlesRepository';

interface Request {
  keyword: string;
}

@injectable()
class ShowArticlesByKeywordService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
  ) {}

  public async execute({ keyword }: Request): Promise<Articles[] | undefined> {
    const articles = await this.articlesRepository.findArticlesByKeyword(
      keyword,
    );

    return articles;
  }
}

export default ShowArticlesByKeywordService;
