/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import DatabaseRepository from './DatabaseRepository';
import selectsSqls from '../sqls/selects';
import insertsSqls from '../sqls/inserts';
import deletesSqls from '../sqls/deletes';

class MigrateRepository {
  private connection: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(connection: any) {
    this.connection = connection;
  }

  // eslint-disable-next-line class-methods-use-this
  public async selectOnlyMigrateVersion(version: string): Promise<string[]> {
    const databaseRepository = new DatabaseRepository(this.connection);
    const response = await databaseRepository.query(
      selectsSqls.SELECT_MIGRATE_VERSION,
      [version],
    );

    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  public async insertMigrateVersion(version: string): Promise<string[]> {
    const databaseRepository = new DatabaseRepository(this.connection);
    const createdAt = moment().utc().format('YYYY-MM-DD HH-mm-ss');
    const versionId = uuidv4();
    const response = await databaseRepository.query(
      insertsSqls.INSERT_VERSION_MIGRATE,
      [versionId, version, createdAt],
    );

    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  public async deleteMigrateVersion(version: string): Promise<string[]> {
    const databaseRepository = new DatabaseRepository(this.connection);
    const response = await databaseRepository.query(
      deletesSqls.DELETE_VERSION_MIGRATE,
      [version],
    );

    return response;
  }
}

export default MigrateRepository;
