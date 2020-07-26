import Database from "../database/Database";
import selectsSqls from "../sqls/selects";
import deletesSqls from "../sqls/deletes";

/* eslint-disable @typescript-eslint/no-explicit-any */
class DatabaseRepository {
  public async query(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    script: string,
    values: any[] = []
  ): Promise<any[]> {
    const sqlFormated = await CONN.format(script, values);
    const response = await CONN.query(sqlFormated);
    return response;
  }

  public async create(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    script: string
  ): Promise<any[]> {
    const response = await this.query(CONN, script);
    return response;
  }

  public async truncateTable(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    tableName: string
  ): Promise<any[]> {
    const handleTruncate = deletesSqls.TRUNCATE_TABLE.replace(
      ":table",
      tableName
    );
    const response = await this.query(CONN, handleTruncate);
    return response;
  }

  public async queryTableDatabase(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    tableName: string
  ): Promise<any[]> {
    const response = await this.query(CONN, selectsSqls.SELECT_TABLE_MYSQL, [
      tableName,
    ]);

    return response;
  }

  public async executeWithDatabase(func: (CONN: any) => any): Promise<any> {
    const DatabaseInstance = new Database();
    const connection = await DatabaseInstance.getConnection();

    let response;
    try {
      response = await func(connection);
      await connection.end();
    } catch (err) {
      await connection.end();
      throw err;
    }

    return response;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async startTransaction(CONN: any): Promise<any> {
    await CONN.beginTransaction();
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async commit(CONN: any): Promise<any> {
    await CONN.commit();
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async rollback(CONN: any): Promise<any> {
    await CONN.rollback();
    return true;
  }
}

export default DatabaseRepository;
