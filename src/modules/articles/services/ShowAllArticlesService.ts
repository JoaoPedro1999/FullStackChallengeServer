import { injectable, inject } from 'tsyringe';
import Articles from '../infra/typeorm/entities/Articles';
import IArticlesRepository from '../repositories/IArticlesRepository';

interface Request {
  page?: number;
}

@injectable()
class CreateArticleService {
  constructor(
    @inject('ArticleRepositoru')
    private articleRepository: IArticlesRepository,
  ) {}

  public async execute({ page }: Request): Promise<Articles[]> {
    const article = await this.articleRepository.findAllArticles(page);

    return article;
  }
}

export default CreateArticleService;
