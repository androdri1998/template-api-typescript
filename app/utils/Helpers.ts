import { stages } from "./configs";

export default class Helpers {
  getPathEnv(environment: string): string {
    let path;
    if (environment === stages.DEV) {
      path = ".env.dev";
    } else if (environment === stages.PROD) {
      path = ".env.prod";
    } else {
      path = ".env.test";
    }

    return path;
  }
}
