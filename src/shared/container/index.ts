import { container } from 'tsyringe';

import IArticlesRepository from '@modules/articles/repositories/IArticlesRepository';
import ArticlesRepository from '@modules/articles/infra/typeorm/repositories/ArticlesRepository';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository';

import ILaunchesRepository from '@modules/launches/repositories/ILaunchesRepository';
import LaunchesRepository from '@modules/launches/infra/typeorm/repositories/LaunchesRepository';

container.registerSingleton<IArticlesRepository>(
  'ArticlesRepository',
  ArticlesRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);

container.registerSingleton<ILaunchesRepository>(
  'LaunchesRepository',
  LaunchesRepository,
);
