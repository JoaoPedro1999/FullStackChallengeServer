import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 server started on port 3333');
});
