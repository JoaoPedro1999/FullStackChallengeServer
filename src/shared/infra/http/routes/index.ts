import { Router } from 'express';

const routes = Router();
import articleRouter from '@modules/articles/infra/http/routes/article.routes';

routes.get('/', (Request, Response) => {
  return Response.json({
    message: 'Fullstack Challenge 2021 🏅 - Space Flight News',
  });
});
routes.use('/articles', articleRouter);

export default routes;
