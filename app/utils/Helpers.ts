import { stages } from './configs';

export default class Helpers {
  // eslint-disable-next-line class-methods-use-this
  public getPathEnv(environment: string): string {
    let path;
    if (environment === stages.DEV) {
      path = '.env.dev';
    } else if (environment === stages.PROD) {
      path = '.env.prod';
    } else {
      path = '.env.test';
    }

    return path;
  }
}
