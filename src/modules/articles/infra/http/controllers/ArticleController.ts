import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateArticleService from '@modules/articles/services/CreateArticleService';
import ShowAllArticlesService from '@modules/articles/services/ShowAllArticlesService';
import ShowArticlesByKeywordService from '@modules/articles/services/ShowArticlesByKeywordService';
import ShowArticleByIdService from '@modules/articles/services/ShowArticleByIdService';
import DeleteArticleService from '@modules/articles/services/DeleteArticleService';
import UpdateArticleService from '@modules/articles/services/UpdateArticleService';

interface RequestParams {
  keyword?: string;
  page?: string;
}

export default class TransactionController {
  public async index(
    request: Request<{}, {}, {}, RequestParams>,
    response: Response,
  ): Promise<Response> {
    let articles;

    const { keyword, page } = request.query;

    const showAllArticlesService = container.resolve(ShowAllArticlesService);

    const showArticlesByKeywordService = container.resolve(
      ShowArticlesByKeywordService,
    );

    if (keyword) {
      articles = await showArticlesByKeywordService.execute({ keyword });
    }

    if (page) {
      articles = await showAllArticlesService.execute({ page });
    }

    return response.json(articles);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { articleId } = request.params;

    const showArticleByIdService = container.resolve(ShowArticleByIdService);

    const articles = await showArticleByIdService.execute({ articleId });

    return response.json(articles);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      events,
      featured,
      imageUrl,
      launches,
      newsSite,
      publishedAt,
      summary,
      url,
    } = request.body;

    const createArticleService = container.resolve(CreateArticleService);

    const article = await createArticleService.execute({
      title,
      events,
      featured,
      imageUrl,
      launches,
      newsSite,
      publishedAt,
      summary,
      url,
    });

    return response.status(201).json(article);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { articleId } = request.params;
    const { title, featured, imageUrl, newsSite, publishedAt, summary, url } =
      request.body;

    const updateArticleService = container.resolve(UpdateArticleService);

    const article = await updateArticleService.execute({
      articleId,
      featured,
      imageUrl,
      newsSite,
      summary,
      title,
      url,
    });

    return response.status(201).json(article);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { articleId } = request.params;

    const deleteArticleService = container.resolve(DeleteArticleService);

    deleteArticleService.execute({
      articleId,
    });

    return response.status(204).json();
  }
}
