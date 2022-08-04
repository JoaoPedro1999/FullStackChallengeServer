import UpdateArticleService from './UpdateArticleService';
import FakeArticlesRepository from '../repositories/fakes/FakeArticlesRepository';
import AppError from '@shared/errors/AppError';

let updateArticleService: UpdateArticleService;
let fakeArticlesRepository: FakeArticlesRepository;

describe('UpdateArticle', () => {
  beforeEach(() => {
    fakeArticlesRepository = new FakeArticlesRepository();
    updateArticleService = new UpdateArticleService(fakeArticlesRepository);
  });

  it('should be able to update an article', async () => {
    const article = await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    const updateArticle = await updateArticleService.execute({
      title: 'New Title',
      featured: article.featured,
      imageUrl: article.imageUrl,
      newsSite: article.newsSite,
      summary: article.summary,
      url: article.url,
      articleId: article.id,
    });

    expect(updateArticle.title).toEqual('New Title');
  });

  it('should not be able to update an article what article does not exists', async () => {
    const article = await fakeArticlesRepository.create({
      featured: true,
      imageUrl: 'ouabhfiyuasyiuiyuai',
      newsSite: 'ioufhiuasfiyua',
      publishedAt: new Date(),
      summary: 'Uhuiduiyiyuagi',
      title: 'uioiuasuihfiusa',
      url: 'ouqaoufiuosadhfi',
    });

    await expect(
      updateArticleService.execute({
        title: 'New Title',
        featured: article.featured,
        imageUrl: article.imageUrl,
        newsSite: article.newsSite,
        summary: article.summary,
        url: article.url,
        articleId: 'hsabvdjhasvjudvajshvdjas',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
