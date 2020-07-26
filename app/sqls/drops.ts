import { databaseTables } from "../utils/configs";
import { IDropsSqls } from "./drops-types";

const dropsSqls: IDropsSqls = {
  DROP_TABLE_MIGRATE_VERSIONS: `
    DROP TABLE ${databaseTables.migrateVersions};
  `,
};

export default dropsSqls;
