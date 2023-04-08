import 'reflect-metadata';
import { AppDataSource } from './data-source';

export interface IDatabase {
  setup(): Promise<any>;
}

class Database implements IDatabase {
  async setup() {
    try {
      await AppDataSource.initialize();
    } catch (error) {
      console.error('Failed connect Database', error);
    }
  }
}

export default new Database();
