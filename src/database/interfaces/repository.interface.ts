export interface IRepository<T, ID = number> {
  create(entity: T): Promise<T>;
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: ID, entity: Partial<T>): Promise<T | null>;
  delete(id: ID): Promise<boolean>;
}
