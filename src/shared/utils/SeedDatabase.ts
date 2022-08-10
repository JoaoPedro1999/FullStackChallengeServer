import 'reflect-metadata';
import axios from 'axios';
import { AppDataSource } from '@shared/infra/database/typeormClient';
import Articles from '../../modules/articles/infra/typeorm/entities/Articles';
import Events from '../../modules/events/infra/typeorm/entities/Events';
import Launches from '../../modules/launches/infra/typeorm/entities/Launches';

interface Response {
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

async function SeedDatabase() {
  const limit = 500;
  const articles = false;
  const articlesRepository = AppDataSource.getRepository(Articles);
  const eventsRepository = AppDataSource.getRepository(Events);
  const launchesRepository = AppDataSource.getRepository(Launches);

  if (articles) {
    const response = await axios.get<Response[]>(
      `https://api.spaceflightnewsapi.net/v3/articles?_limit=${limit}`,
    );

    response.data.forEach(async element => {
      const article = articlesRepository.create({
        featured: element.featured,
        imageUrl: element.imageUrl,
        newsSite: element.newsSite,
        publishedAt: element.publishedAt,
        summary: element.summary,
        title: element.title,
        url: element.url,
      });

      await articlesRepository.save(article);

      element.events.forEach(async eachEvent => {
        const newEvent = eventsRepository.create({
          articleId: article.id,
          provider: eachEvent.provider,
        });

        await eventsRepository.save(newEvent);
      });

      element.launches.forEach(async launch => {
        const newLaunch = launchesRepository.create({
          articleId: article.id,
          provider: launch.provider,
        });

        await launchesRepository.save(newLaunch);
      });
    });
  }

  console.log('Deu bom');
}

SeedDatabase();

export { SeedDatabase };
