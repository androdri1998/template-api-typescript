import { databaseTables } from "../utils/configs";
import { ISelectsSqls } from "./selects-types";

const selectsSqls: ISelectsSqls = {
  SELECT_TABLE_MYSQL: `SELECT * FROM information_schema.tables WHERE table_name = ? LIMIT 1;`,
  SELECT_MIGRATE_VERSION: `
    SELECT version FROM ${databaseTables.migrateVersions} WHERE version = ?;
  `,
};

export default selectsSqls;
