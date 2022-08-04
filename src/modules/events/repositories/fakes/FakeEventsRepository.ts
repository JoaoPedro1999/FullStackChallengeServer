import { v4 } from 'uuid';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';

import Events from '@modules/events/infra/typeorm/entities/Events';

class FakeEventsRepository implements IEventsRepository {
  private events: Events[] = [];

  public async create({
    articleId,
    provider,
  }: ICreateEventDTO): Promise<Events> {
    const event = new Events();

    event.id = v4();
    event.articleId = articleId;
    event.provider = provider;

    this.events.push(event);

    return event;
  }

  public async save(event: Events): Promise<Events> {
    const findIndex = this.events.findIndex(
      findEvent => findEvent.id === event.id,
    );

    this.events[findIndex] = event;

    return event;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.events.findIndex(
      findEvent => findEvent.articleId === id,
    );

    this.events.splice(findIndex, 1);

    return;
  }
}

export default FakeEventsRepository;
