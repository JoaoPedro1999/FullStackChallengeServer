import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/database/typeormClient';
import IArticlesRepository from '@modules/launches/repositories/ILaunchesRepository';
import ICreateLaunchDTO from '@modules/launches/dtos/ICreateLaunchDTO';

import Launches from '@modules/launches/infra/typeorm/entities/Launches';

class LaunchesRepository implements IArticlesRepository {
  private ormRepository: Repository<Launches>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Launches);
  }

  public async create({
    articleId,
    provider,
  }: ICreateLaunchDTO): Promise<Launches> {
    const launch = this.ormRepository.create({
      articleId: articleId,
      provider: provider,
    });

    await this.ormRepository.save(launch);

    return launch;
  }

  public async save(launch: Launches): Promise<Launches> {
    const launchUpdated = await this.ormRepository.save(launch);

    return launchUpdated;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      articleId: id,
    });
  }
}

export default LaunchesRepository;
