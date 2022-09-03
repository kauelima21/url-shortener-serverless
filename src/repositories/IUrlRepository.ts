import { Url } from './../model/Url';

export interface IUrlRepository {
  findById(id: string): Promise<Url | null>;
  save(url: Url): Promise<boolean>;
  update(id: string, views: number): Promise<boolean>;
}

