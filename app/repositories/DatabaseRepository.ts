import selectsSqls from '../sqls/selects';
import deletesSqls from '../sqls/deletes';

/* eslint-disable @typescript-eslint/no-explicit-any */
class DatabaseRepository {
  private connection: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(connection: any) {
    this.connection = connection;
  }

  public async query(script: string, values: any[] = []): Promise<any[]> {
    const sqlFormated = await this.connection.format(script, values);
    const response = await this.connection.query(sqlFormated);
    return response;
  }

  public async create(script: string): Promise<any[]> {
    const response = await this.query(script);
    return response;
  }

  public async truncateTable(tableName: string): Promise<any[]> {
    const handleTruncate = deletesSqls.TRUNCATE_TABLE.replace(
      ':table',
      tableName,
    );
    const response = await this.query(handleTruncate);
    return response;
  }

  public async queryTableDatabase(tableName: string): Promise<any[]> {
    const response = await this.query(selectsSqls.SELECT_TABLE_MYSQL, [
      tableName,
    ]);

    return response;
  }

  public async startTransaction(): Promise<any> {
    await this.connection.beginTransaction();
    return true;
  }

  public async commit(): Promise<any> {
    await this.connection.commit();
    return true;
  }

  public async rollback(): Promise<any> {
    await this.connection.rollback();
    return true;
  }
}

export default DatabaseRepository;
