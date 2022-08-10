import { Repository, Like, FindOptionsOrderValue } from 'typeorm';
import { AppDataSource } from '@shared/infra/database/typeormClient';
import IArticlesRepository from '@modules/articles/repositories/IArticlesRepository';
import ICreateArticleDTO from '@modules/articles/dtos/ICreateArticleDTO';

import Articles from '@modules/articles/infra/typeorm/entities/Articles';

class ArticlesRepository implements IArticlesRepository {
  private ormRepository: Repository<Articles>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Articles);
  }

  public async create({
    featured,
    imageUrl,
    newsSite,
    publishedAt,
    summary,
    title,
    url,
  }: ICreateArticleDTO): Promise<Articles> {
    const article = this.ormRepository.create({
      url: url,
      featured: featured,
      imageUrl: imageUrl,
      newsSite: newsSite,
      publishedAt: publishedAt,
      summary: summary,
      title: title,
    });

    await this.ormRepository.save(article);

    return article;
  }

  public async findAllArticles(
    page = '1',
    orderBy: FindOptionsOrderValue,
  ): Promise<Articles[]> {
    const pageFormatted = Number(page);

    const articles = await this.ormRepository.find({
      skip: pageFormatted === 0 ? 0 : pageFormatted * 10 + 1,
      take: 10,
      relations: ['launches', 'events'],
      order: {
        publishedAt: orderBy,
      },
    });

    return articles;
  }

  public async findArticlesByKeyword(
    keyword: string,
  ): Promise<Articles[] | undefined> {
    const articles = await this.ormRepository.find({
      where: {
        title: Like(`%${keyword}%`),
      },
      relations: ['events', 'launches'],
    });

    return articles;
  }

  public async findArticleById(id: string): Promise<Articles | undefined> {
    const article = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['events', 'launches'],
    });

    if (article) {
      return article;
    }

    return undefined;
  }

  public async save(article: Articles): Promise<Articles> {
    const articleUpdated = await this.ormRepository.save(article);

    return articleUpdated;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ArticlesRepository;
