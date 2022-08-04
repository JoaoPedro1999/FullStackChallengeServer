import AppError from '@shared/errors/AppError';
import ShowAllArticlesService from './ShowAllArticlesService';
import FakeArticlesRepository from '../repositories/fakes/FakeArticlesRepository';

let showAllArticlesService: ShowAllArticlesService;
let fakeArticlesRepository: FakeArticlesRepository;

describe('ShowAllArticles', () => {
  beforeEach(() => {
    fakeArticlesRepository = new FakeArticlesRepository();

    showAllArticlesService = new ShowAllArticlesService(fakeArticlesRepository);
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

    const articleTwo = await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    const articleThree = await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    const articles = await showAllArticlesService.execute({
      page: '1',
    });

    expect(articles).toEqual([articleOne, articleTwo, articleThree]);
  });
});
