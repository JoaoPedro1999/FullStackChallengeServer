import 'reflect-metadata';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ILaunchesRepository from '@modules/launches/repositories/ILaunchesRepository';
import { injectable, inject } from 'tsyringe';
import IArticlesRepository from '../repositories/IArticlesRepository';

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
    await this.articlesRepository.delete(articleId);

    await this.launchesRepository.delete(articleId);

    await this.eventsRepository.delete(articleId);
  }
}

export default DeleteArticleService;
