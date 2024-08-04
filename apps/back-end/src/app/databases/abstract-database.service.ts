import { OnModuleInit } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

export abstract class AbstractDatabaseService<T> implements OnModuleInit {
  protected db: Low<T>;

  constructor(private fileName: string, private defaultData: T) {}

  async onModuleInit() {
    const adapter = new JSONFile<T>(
      `./apps/back-end/src/app/db/${this.fileName}`
    );
    this.db = new Low<T>(adapter, this.defaultData);

    await this.db.read();
    if (!this.db.data) {
      this.db.data = this.defaultData;
      await this.db.write();
    }
  }

  abstract getAll(): Promise<T>;
  abstract add(item: Omit<any, 'id'>): Promise<void>;
}
