import Launches from '../infra/typeorm/entities/Launches';
import ICreateLaunchDTO from '../dtos/ICreateLaunchDTO';

import { PrismaPromise } from '@prisma/client';

export default interface ILaunchesRepository {
  create(data: ICreateLaunchDTO): Promise<Launches>;
}
