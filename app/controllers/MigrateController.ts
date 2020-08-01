/* eslint-disable import/first */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import dotenv from 'dotenv';
import Helpers from '../utils/Helpers';

const HelpersInstance = new Helpers();
dotenv.config({
  path: HelpersInstance.getPathEnv(process.env.NODE_ENV as string),
});

import migrations from '../scripts/migrations';
import { databaseTables } from '../utils/configs';
import Database from '../database/Database';
import DatabaseRepository from '../repositories/DatabaseRepository';
import MigrateRepository from '../repositories/MigrateRepository';

enum EMigrates {
  UP = 'up',
  DOWN = 'down',
}

class MigrateController {
  // eslint-disable-next-line class-methods-use-this
  private async executeMigration(
    type: EMigrates,
    executeAll: boolean,
  ): Promise<string[]> {
    const database = new Database();
    const responseFunction = await database.executeWithDatabase(async CONN => {
      const DatabaseRepositoryInstance = new DatabaseRepository(CONN);
      const MigrateRepositoryInstance = new MigrateRepository(CONN);
      const actions: string[] = [];
      const addeds: string[] = [];
      const excludeds: string[] = [];

      if (type === EMigrates.UP) {
        for (const key in migrations) {
          const migrate = migrations[key];
          if (Number(key) === 0) {
            const hasTable = await DatabaseRepositoryInstance.queryTableDatabase(
              databaseTables.migrateVersions,
            );

            if (hasTable.length === 0) {
              for (const scriptObj of migrate.up) {
                await DatabaseRepositoryInstance.create(scriptObj.script);
                actions.push(scriptObj.description);
              }

              MigrateRepositoryInstance.insertMigrateVersion(migrate.version);
              addeds.push(migrate.version);
            }
          } else {
            try {
              const versionArr = await MigrateRepositoryInstance.selectOnlyMigrateVersion(
                migrate.version,
              );

              if (
                (versionArr.length === 0 && executeAll) ||
                (versionArr.length === 0 &&
                  !executeAll &&
                  addeds.length === 0 &&
                  !addeds.includes(migrate.version))
              ) {
                for (const scriptObj of migrate.up) {
                  await DatabaseRepositoryInstance.create(scriptObj.script);
                  actions.push(scriptObj.description);
                }

                MigrateRepositoryInstance.insertMigrateVersion(migrate.version);
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
              databaseTables.migrateVersions,
            );

            if (hasTable.length > 0) {
              const versionArr = await MigrateRepositoryInstance.selectOnlyMigrateVersion(
                migrate.version,
              );
              if (
                (versionArr.length > 0 && executeAll) ||
                (versionArr.length > 0 &&
                  !executeAll &&
                  excludeds.length === 0 &&
                  !excludeds.includes(migrate.version))
              ) {
                for (const scriptObj of migrate.down) {
                  await DatabaseRepositoryInstance.create(scriptObj.script);
                  actions.push(scriptObj.description);
                }

                if (Number(key) < migrateReverse.length - 1) {
                  MigrateRepositoryInstance.deleteMigrateVersion(
                    migrate.version,
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
    });

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
