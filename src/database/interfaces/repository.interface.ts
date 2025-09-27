export interface IRepository<TEntity extends { id: any }> {
  create(
    data: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TEntity>;

  findById(id: TEntity['id']): Promise<TEntity | null>;

  findAll(): Promise<TEntity[]>;

  update(
    id: TEntity['id'],
    data: Partial<Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<TEntity | null>;

  delete(id: TEntity['id']): Promise<TEntity | null>;
}
