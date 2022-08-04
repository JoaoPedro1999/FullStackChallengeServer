import FakeEventsRepository from '@modules/events/repositories/fakes/FakeEventsRepository';
import FakeLaunchesRepository from '@modules/launches/repositories/fakes/FakeLaunchesRepository';

import CreateArticleService from './CreateArticleService';
import FakeArticlesRepository from '../repositories/fakes/FakeArticlesRepository';

let createArticleService: CreateArticleService;
let fakeEventsRepository: FakeEventsRepository;
let fakeLaunchesRepository: FakeLaunchesRepository;
let fakeArticlesRepository: FakeArticlesRepository;

describe('CreateArticle', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();
    fakeLaunchesRepository = new FakeLaunchesRepository();
    fakeArticlesRepository = new FakeArticlesRepository();

    createArticleService = new CreateArticleService(
      fakeArticlesRepository,
      fakeEventsRepository,
      fakeLaunchesRepository,
    );
  });

  it('should be able to create a new article', async () => {
    const article = await createArticleService.execute({
      events: [
        {
          provider: 'teste',
        },
      ],
      featured: true,
      imageUrl: 'nauioiuasdbiisdafi',
      launches: [
        {
          provider: 'teste',
        },
      ],
      newsSite: 'sbfdasufuia',
      publishedAt: new Date(),
      summary: 'uasbiyuasbiyfasbf',
      title: 'asbfhiyuasiufba',
      url: 'anfiuosafiuoafabs',
    });

    expect(article).toHaveProperty('id');
  });
});
