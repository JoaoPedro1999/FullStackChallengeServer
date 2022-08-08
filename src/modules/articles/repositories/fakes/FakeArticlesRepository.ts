/* eslint-disable no-param-reassign */
import IArticlesRepository from '@modules/articles/repositories/IArticlesRepository';
import ICreateArticleDTO from '@modules/articles/dtos/ICreateArticleDTO';

import Article from '@modules/articles/infra/typeorm/entities/Articles';
import { v4 } from 'uuid';

class FakeArticlesRepository implements IArticlesRepository {
  private articles: Article[] = [];

  public async create({
    featured,
    imageUrl,
    newsSite,
    publishedAt,
    summary,
    title,
    url,
  }: ICreateArticleDTO): Promise<Article> {
    const article = new Article();

    article.id = v4();
    article.featured = featured;
    article.imageUrl = imageUrl;
    article.publishedAt = publishedAt;
    article.summary = summary;
    article.title = title;
    article.url = url;
    article.newsSite = newsSite;

    this.articles.push(article);

    return article;
  }

  public async findAllArticles(page = '0'): Promise<Article[]> {
    const skipElements = Number(page) * 10;

    if (skipElements > 0) {
      const articlesPagination = this.articles.slice(
        (Number(page) - 1) * 10,
        skipElements,
      );

      return articlesPagination;
    }

    return this.articles;
  }

  public async findArticlesByKeyword(
    keyword: string,
  ): Promise<Article[] | undefined> {
    const articles = this.articles.filter(article =>
      article.title.includes(keyword),
    );

    return articles;
  }

  public async findArticleById(id: string): Promise<Article | undefined> {
    const article = this.articles.find(article => article.id === id);

    return article;
  }

  public async save(article: Article): Promise<Article> {
    const findIndex = this.articles.findIndex(
      findArticle => findArticle.id === article.id,
    );

    this.articles[findIndex] = article;

    return article;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.articles.findIndex(
      findArticle => findArticle.id === id,
    );

    this.articles.splice(findIndex, 1);

    return;
  }
}

export default FakeArticlesRepository;
