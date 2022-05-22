import chalk from 'chalk';
import { EnvKeyStore } from '../store/env-key.store';
import { DebugService } from './debug.service';

export class ConfigService {
  static get(key: EnvKeyStore | string): string {
    return process.env[key] || '';
  }

  static printEnvKeys(): void {
    for (const key in EnvKeyStore) {
      DebugService.debug(
        `${chalk.green.bold(key)}: ${chalk.cyan(ConfigService.get(key))}`
      );
    }
  }
}
