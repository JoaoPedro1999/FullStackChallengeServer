import 'reflect-metadata';

import CreateArticleService from '../../modules/articles/services/CreateArticleService';
import axios from 'axios';
import { container } from 'tsyringe';

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
  const response = await axios.get<Response[]>(
    'https://api.spaceflightnewsapi.net/v3/articles?_limit=500',
  );

  const createArticleService = container.resolve(CreateArticleService);

  response.data.forEach(element => {
    createArticleService.execute({
      events: element.events,
      featured: element.featured,
      imageUrl: element.imageUrl,
      launches: element.launches,
      newsSite: element.newsSite,
      publishedAt: element.publishedAt,
      summary: element.summary,
      title: element.title,
      url: element.url,
    });
  });

  console.log('Deu bom');
}

SeedDatabase();

export { SeedDatabase };
