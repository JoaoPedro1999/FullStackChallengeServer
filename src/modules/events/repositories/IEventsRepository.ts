import Events from '../infra/typeorm/entities/Events';
import ICreateEventDTO from '../dtos/ICreateEventDTO';

export default interface IEventsRepository {
  create(data: ICreateEventDTO): Promise<Events>;
  save(data: Events): Promise<Events>;
  delete(id: string): Promise<void>;
}
