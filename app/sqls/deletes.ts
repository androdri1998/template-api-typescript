import { databaseTables } from "../utils/configs";
import { IDeletesSqls } from "./deletes-types";

const deletesSqls: IDeletesSqls = {
  DELETE_VERSION_MIGRATE: `DELETE FROM ${databaseTables.migrateVersions} WHERE version = ?;`,
  TRUNCATE_TABLE: `TRUNCATE TABLE :table;`,
};

export default deletesSqls;
