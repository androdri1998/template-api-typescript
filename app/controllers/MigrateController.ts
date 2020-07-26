import dotenv from "dotenv";
import Helpers from "../utils/Helpers";
const HelpersInstance = new Helpers();
dotenv.config({
  path: HelpersInstance.getPathEnv(process.env.NODE_ENV as string),
});

import migrations from "../scripts/migrations";
import { databaseTables } from "../utils/configs";
import DatabaseRepository from "../repositories/DatabaseRepository";
import MigrateRepository from "../repositories/MigrateRepository";

enum EMigrates {
  UP = "up",
  DOWN = "down",
}

class MigrateController {
  private async executeMigration(type: EMigrates, executeAll: boolean) {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    const responseFunction = await DatabaseRepositoryInstance.executeWithDatabase(
      async (CONN) => {
        const actions: string[] = [];
        const addeds: string[] = [];
        const excludeds: string[] = [];
        const MigrateRepositoryInstance = new MigrateRepository();

        if (type === EMigrates.UP) {
          for (const key in migrations) {
            const migrate = migrations[key];
            if (Number(key) === 0) {
              const hasTable = await DatabaseRepositoryInstance.queryTableDatabase(
                CONN,
                databaseTables.migrateVersions
              );

              if (hasTable.length === 0) {
                for (const scriptObj of migrate.up) {
                  await DatabaseRepositoryInstance.create(
                    CONN,
                    scriptObj.script
                  );
                  actions.push(scriptObj.description);
                }

                MigrateRepositoryInstance.insertMigrateVersion(
                  CONN,
                  migrate.version
                );
                addeds.push(migrate.version);
              }
            } else {
              try {
                const versionArr = await MigrateRepositoryInstance.selectOnlyMigrateVersion(
                  CONN,
                  migrate.version
                );

                if (
                  (versionArr.length === 0 && executeAll) ||
                  (versionArr.length === 0 &&
                    !executeAll &&
                    addeds.length === 0 &&
                    !addeds.includes(migrate.version))
                ) {
                  for (const scriptObj of migrate.up) {
                    await DatabaseRepositoryInstance.create(
                      CONN,
                      scriptObj.script
                    );
                    actions.push(scriptObj.description);
                  }

                  MigrateRepositoryInstance.insertMigrateVersion(
                    CONN,
                    migrate.version
                  );
                  addeds.push(migrate.version);
                }
              } catch (err) {
                console.log(err);
              }
            }
          }
        } else if (type === EMigrates.DOWN) {
          const migrateReverse = migrations.reverse();
          for (const key in migrateReverse) {
            const migrate = migrateReverse[key];
            try {
              const hasTable = await DatabaseRepositoryInstance.queryTableDatabase(
                CONN,
                databaseTables.migrateVersions
              );

              if (hasTable.length > 0) {
                const versionArr = await MigrateRepositoryInstance.selectOnlyMigrateVersion(
                  CONN,
                  migrate.version
                );
                if (
                  (versionArr.length > 0 && executeAll) ||
                  (versionArr.length > 0 &&
                    !executeAll &&
                    excludeds.length === 0 &&
                    !excludeds.includes(migrate.version))
                ) {
                  for (const scriptObj of migrate.down) {
                    await DatabaseRepositoryInstance.create(
                      CONN,
                      scriptObj.script
                    );
                    actions.push(scriptObj.description);
                  }

                  if (Number(key) < migrateReverse.length - 1) {
                    MigrateRepositoryInstance.deleteMigrateVersion(
                      CONN,
                      migrate.version
                    );
                    excludeds.push(migrate.version);
                  }
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }

        console.log(actions);
        return actions;
      }
    );

    return responseFunction;
  }

  public async upMigrate(): Promise<void> {
    this.executeMigration(EMigrates.UP, false);
  }

  public async upAllMigrations(): Promise<void> {
    this.executeMigration(EMigrates.UP, true);
  }

  public async downMigrate(): Promise<void> {
    this.executeMigration(EMigrates.DOWN, false);
  }

  public async downAllMigrate(): Promise<void> {
    this.executeMigration(EMigrates.DOWN, true);
  }
}

export default MigrateController;
