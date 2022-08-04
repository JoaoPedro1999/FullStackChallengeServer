import Launches from '../infra/typeorm/entities/Launches';
import ICreateLaunchDTO from '../dtos/ICreateLaunchDTO';

export default interface ILaunchesRepository {
  create(data: ICreateLaunchDTO): Promise<Launches>;
  save(data: Launches): Promise<Launches>;
  delete(id: string): Promise<void>;
}
