import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Articles from '../infra/typeorm/entities/Articles';

import IArticlesRepository from '../repositories/IArticlesRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  articleId: string;
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
}

@injectable()
class UpdateArticleService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
  ) {}

  public async execute({
    articleId,
    featured,
    imageUrl,
    newsSite,
    summary,
    title,
    url,
  }: Request): Promise<Articles> {
    const article = await this.articlesRepository.findArticleById(articleId);

    if (!article) {
      throw new AppError('Article does not exits');
    }

    article.featured = featured;
    article.imageUrl = imageUrl;
    article.newsSite = newsSite;
    article.summary = summary;
    article.title = title;
    article.url = url;

    await this.articlesRepository.save(article);

    return article;
  }
}

export default UpdateArticleService;
