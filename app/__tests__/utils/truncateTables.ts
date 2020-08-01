/* eslint-disable import/first */
import dotenv from 'dotenv';
import Helpers from '../../utils/Helpers';

const HelpersInstance = new Helpers();
dotenv.config({
  path: HelpersInstance.getPathEnv(process.env.NODE_ENV as string),
});

import DatabaseRepository from '../../repositories/DatabaseRepository';
import Database from '../../database/Database';

export default async (tables: string[] = []): Promise<boolean> => {
  const database = new Database();
  await database.executeWithDatabase(async CONN => {
    const databaseRepository = new DatabaseRepository(CONN);
    await Promise.all(
      tables.map(async table => {
        const response = await databaseRepository.truncateTable(table);
        return response;
      }),
    );
    return true;
  });
  return true;
};
