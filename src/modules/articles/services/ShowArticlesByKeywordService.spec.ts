import ShowArticlesByKeywordService from './ShowArticlesByKeywordService';
import FakeArticlesRepository from '../repositories/fakes/FakeArticlesRepository';

let showArticlesByKeywordService: ShowArticlesByKeywordService;
let fakeArticlesRepository: FakeArticlesRepository;

describe('ShowArticleById', () => {
  beforeEach(() => {
    fakeArticlesRepository = new FakeArticlesRepository();
    showArticlesByKeywordService = new ShowArticlesByKeywordService(
      fakeArticlesRepository,
    );
  });

  it('should be able to find an article by keyword', async () => {
    await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    const findArticlesByKeyword = await showArticlesByKeywordService.execute({
      keyword: 'uioiuasuihfiusa',
    });

    expect(findArticlesByKeyword && findArticlesByKeyword[0].title).toEqual(
      'uioiuasuihfiusa',
    );
  });
});
