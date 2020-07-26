import createsSqls from "../sqls/creates";
import altersSqls from "../sqls/alters";
import dropsSqls from "../sqls/drops";
import { databaseTables } from "../utils/configs";

const migrations = [
  {
    version: "1014ad50-fb90-43a0-a5d2-8901524b010d",
    up: [
      {
        script: createsSqls.CREATE_TABLE_MIGRATE_VERSIONS,
        description: `Create table ${databaseTables.migrateVersions}.`,
      },
    ],
    down: [
      {
        script: dropsSqls.DROP_TABLE_MIGRATE_VERSIONS,
        description: `Drop table ${databaseTables.migrateVersions}.`,
      },
    ],
  },
];

export default migrations;
