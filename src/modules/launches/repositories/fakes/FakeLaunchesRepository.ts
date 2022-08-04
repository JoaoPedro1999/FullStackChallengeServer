/* eslint-disable no-param-reassign */
import { uuid } from 'uuidv4';
import ILaunchesRepository from '@modules/launches/repositories/ILaunchesRepository';
import ICreateLaunchDTO from '@modules/launches/dtos/ICreateLaunchDTO';

import Launches from '@modules/launches/infra/typeorm/entities/Launches';

class FakeArticlesRepository implements ILaunchesRepository {
  private launches: Launches[] = [];

  public async create({
    articleId,
    provider,
  }: ICreateLaunchDTO): Promise<Launches> {
    const launch = new Launches();

    launch.id = uuid();
    launch.articleId = articleId;
    launch.provider = provider;

    this.launches.push(launch);

    return launch;
  }
}

export default FakeArticlesRepository;
