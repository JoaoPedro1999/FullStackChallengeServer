import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ArticleController from '../controllers/ArticleController';

const articleRouter = Router();
const articleController = new ArticleController();

articleRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string(),
      keyword: Joi.string(),
    },
  }),
  articleController.index,
);

articleRouter.get(
  '/:articleId',
  celebrate({
    [Segments.PARAMS]: {
      articleId: Joi.string().required(),
    },
  }),
  articleController.show,
);

articleRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
      value: Joi.number().required(),
      events: Joi.array().required(),
      featured: Joi.string().required(),
      imageUrl: Joi.string().required(),
      launches: Joi.array().required(),
      newsSite: Joi.array().required(),
      publishedAt: Joi.date().required(),
      summary: Joi.string().required(),
      url: Joi.string().required(),
    },
  }),
  articleController.create,
);

articleRouter.put(
  '/:articleId',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
      value: Joi.number().required(),
      events: Joi.array().required(),
      featured: Joi.string().required(),
      imageUrl: Joi.string().required(),
      summary: Joi.string().required(),
      url: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      articleId: Joi.string().required(),
    },
  }),
  articleController.update,
);

articleRouter.delete(
  '/:articleId',
  celebrate({
    [Segments.PARAMS]: {
      articleId: Joi.string().required(),
    },
  }),
  articleController.delete,
);

export default articleRouter;
