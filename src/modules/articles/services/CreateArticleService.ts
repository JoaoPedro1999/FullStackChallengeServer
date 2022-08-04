/*
 * This file is responsible for creating a new transaction,
 * also checking the balance for creating an outgoing transaction. */

import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

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
    @inject('ArticleRepositoru')
    private articleRepository: IArticlesRepository,

    @inject('EventsRepository')
    private eventRepository: IEventsRepository,

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
  }: Request): Promise<Articles | null> {
    const article = await this.articleRepository.create({
      featured,
      imageUrl,
      newsSite,
      publishedAt,
      summary,
      title,
      url,
    });

    events.forEach(async event => {
      await this.eventRepository.create({
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
