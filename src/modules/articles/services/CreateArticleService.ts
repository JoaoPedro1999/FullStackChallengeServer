import { injectable, inject } from 'tsyringe';

import Articles from '../infra/typeorm/entities/Articles';

import IArticlesRepository from '../repositories/IArticlesRepository';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ILaunchesRepository from '@modules/launches/repositories/ILaunchesRepository';

interface Request {
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: Date;
  events: Array<{
    provider: string;
  }>;
  launches: Array<{
    provider: string;
  }>;
}

@injectable()
class CreateArticleService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('LaunchesRepository')
    private launchesRepository: ILaunchesRepository,
  ) {}

  public async execute({
    events,
    featured,
    imageUrl,
    launches,
    newsSite,
    publishedAt,
    summary,
    title,
    url,
  }: Request): Promise<Articles> {
    const article = await this.articlesRepository.create({
      featured,
      imageUrl,
      newsSite,
      publishedAt,
      summary,
      title,
      url,
    });

    events.forEach(async event => {
      await this.eventsRepository.create({
        articleId: article.id,
        provider: event.provider,
      });
    });

    launches.forEach(async launch => {
      await this.launchesRepository.create({
        articleId: article.id,
        provider: launch.provider,
      });
    });

    return article;
  }
}

export default CreateArticleService;
