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

describe('DeleteArticle', () => {
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

  it('should be able to delete a article', async () => {
    const articleOne = await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    await deleteArticleService.execute({
      articleId: articleOne.id,
    });

    const findArticleById = await fakeArticlesRepository.findArticleById(
      articleOne.id,
    );

    expect(findArticleById).toBe(undefined);
  });

  it('should not be able to delete a what does not exists', async () => {
    await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    await expect(
      deleteArticleService.execute({
        articleId: 'akasvyhdvhjasfhjasvjhfvjsa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
