import Launches from '../infra/typeorm/entities/Events';
import ICreateLaunchDTO from '../dtos/ICreateEventDTO';

import { PrismaPromise } from '@prisma/client';

export default interface IArticlesRepository {
  create(data: ICreateLaunchDTO): Promise<Launches>;
}
