export interface LowDBDataBase<T> {
  getAll(): Promise<T[]>;
  add(item: T): Promise<void>;
}
