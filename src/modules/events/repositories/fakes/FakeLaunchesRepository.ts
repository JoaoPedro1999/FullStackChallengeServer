/* eslint-disable no-param-reassign */
import { uuid } from 'uuidv4';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';

import Events from '@modules/events/infra/typeorm/entities/Events';

class FakeArticlesRepository implements IEventsRepository {
  private events: Events[] = [];

  public async create({
    articleId,
    provider,
  }: ICreateEventDTO): Promise<Events> {
    const event = new Events();

    event.id = uuid();
    event.articleId = articleId;
    event.provider = provider;

    this.events.push(event);

    return event;
  }
}

export default FakeArticlesRepository;
