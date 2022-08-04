import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Articles from '../infra/typeorm/entities/Articles';
import IArticlesRepository from '../repositories/IArticlesRepository';

interface Request {
  articleId: string;
}

@injectable()
class ShowArticleByIdService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
  ) {}

  public async execute({ articleId }: Request): Promise<Articles | undefined> {
    const article = await this.articlesRepository.findArticleById(articleId);

    if (article) {
      return article;
    }

    return undefined;
  }
}

export default ShowArticleByIdService;
