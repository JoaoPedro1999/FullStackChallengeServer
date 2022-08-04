import AppError from '@shared/errors/AppError';
import DeleteArticleService from './DeleteArticleService';
import FakeEventsRepository from '@modules/events/repositories/fakes/FakeEventsRepository';
import FakeLaunchesRepository from '@modules/launches/repositories/fakes/FakeLaunchesRepository';

import CreateArticleService from './CreateArticleService';
import FakeArticlesRepository from '../repositories/fakes/FakeArticlesRepository';

let fakeEventsRepository: FakeEventsRepository;
let fakeLaunchesRepository: FakeLaunchesRepository;
let fakeArticlesRepository: FakeArticlesRepository;
let deleteArticleService: DeleteArticleService;

describe('Delete Article', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();
    fakeLaunchesRepository = new FakeLaunchesRepository();
    fakeArticlesRepository = new FakeArticlesRepository();

    deleteArticleService = new DeleteArticleService(
      fakeArticlesRepository,
      fakeEventsRepository,
      fakeLaunchesRepository,
    );
  });

  it('should be able to create a new article', async () => {
    const articleOne = await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    const event = await fakeEventsRepository.create({
      articleId: articleOne.id,
      provider: 'nbzhiaiyfbiysd',
    });

    const launch = await fakeLaunchesRepository.create({
      articleId: articleOne.id,
      provider: 'nbzhiaiyfbiysd',
    });

    const articles = await deleteArticleService.execute({
      articleId: articleOne.id,
    });

    const findArticleById = await fakeArticlesRepository.findArticleById(
      articleOne.id,
    );

    expect(findArticleById).toBe(undefined);
  });
});
