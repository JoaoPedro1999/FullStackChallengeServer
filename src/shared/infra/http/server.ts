import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/database/typeormClient';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 server started on port 3333');
});
