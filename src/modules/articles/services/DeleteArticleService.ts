import 'reflect-metadata';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ILaunchesRepository from '@modules/launches/repositories/ILaunchesRepository';
import { injectable, inject } from 'tsyringe';
import IArticlesRepository from '../repositories/IArticlesRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  articleId: string;
}

@injectable()
class DeleteArticleService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('LaunchesRepository')
    private launchesRepository: ILaunchesRepository,
  ) {}

  public async execute({ articleId }: Request): Promise<void> {
    const article = await this.articlesRepository.findArticleById(articleId);

    if (!article) {
      throw new AppError('Article does not exits');
    }

    await this.articlesRepository.delete(article.id);

    await this.launchesRepository.delete(article.id);

    await this.eventsRepository.delete(article.id);
  }
}

export default DeleteArticleService;
