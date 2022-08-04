import ShowArticleByIdService from './ShowArticleByIdService';
import FakeArticlesRepository from '../repositories/fakes/FakeArticlesRepository';

let showArticleByIdService: ShowArticleByIdService;
let fakeArticlesRepository: FakeArticlesRepository;

describe('ShowArticleById', () => {
  beforeEach(() => {
    fakeArticlesRepository = new FakeArticlesRepository();
    showArticleByIdService = new ShowArticleByIdService(fakeArticlesRepository);
  });

  it('should be able to find an article by keyword', async () => {
    const article = await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    const findArticleById = await showArticleByIdService.execute({
      articleId: article.id,
    });

    expect(findArticleById).toHaveProperty('id');
    expect(findArticleById?.id).toEqual(article.id);
  });

  it('should not be able to find an article by Id', async () => {
    const article = await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    const findArticleById = await showArticleByIdService.execute({
      articleId: 'afnjkabiahfaqbibiaq',
    });

    expect(findArticleById).toBe(undefined);
  });
});
