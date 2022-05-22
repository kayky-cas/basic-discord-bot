import * as dotenv from 'dotenv';

export class EnvService {
  static isDev(): boolean {
    return !(process.env.NODE_ENV == 'production');
  }

  static loadEnv(): void {
    if (EnvService.isDev()) {
      dotenv.config();
    }
  }
}
