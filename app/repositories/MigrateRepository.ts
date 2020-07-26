/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import DatabaseRepository from "./DatabaseRepository";
import selectsSqls from "../sqls/selects";
import insertsSqls from "../sqls/inserts";
import deletesSqls from "../sqls/deletes";

class MigrateRepository {
  public async selectOnlyMigrateVersion(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    version: string
  ): Promise<string[]> {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    const response = await DatabaseRepositoryInstance.query(
      CONN,
      selectsSqls.SELECT_MIGRATE_VERSION,
      [version]
    );

    return response;
  }

  public async insertMigrateVersion(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    version: string
  ): Promise<string[]> {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    const createdAt = moment().utc().format("YYYY-MM-DD HH-mm-ss");
    const versionId = uuidv4();
    const response = await DatabaseRepositoryInstance.query(
      CONN,
      insertsSqls.INSERT_VERSION_MIGRATE,
      [versionId, version, createdAt]
    );

    return response;
  }

  public async deleteMigrateVersion(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    version: string
  ): Promise<string[]> {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    const response = await DatabaseRepositoryInstance.query(
      CONN,
      deletesSqls.DELETE_VERSION_MIGRATE,
      [version]
    );

    return response;
  }
}

export default MigrateRepository;
