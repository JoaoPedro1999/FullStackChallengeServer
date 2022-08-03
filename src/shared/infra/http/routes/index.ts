import { Router } from 'express';

const routes = Router();

routes.get('/', (Request, Response) => {
  return Response.json({ message: 'Hello World' });
});

export default routes;
