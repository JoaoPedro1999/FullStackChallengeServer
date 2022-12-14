import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/database/typeormClient';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';

import Events from '@modules/events/infra/typeorm/entities/Events';

class EventsRepository implements IEventsRepository {
  private ormRepository: Repository<Events>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Events);
  }

  public async create({
    articleId,
    provider,
  }: ICreateEventDTO): Promise<Events> {
    const event = this.ormRepository.create({
      articleId: articleId,
      provider: provider,
    });

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: Events): Promise<Events> {
    const eventUpdated = await this.ormRepository.save(event);

    return eventUpdated;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ articleId: id });
  }
}

export default EventsRepository;
