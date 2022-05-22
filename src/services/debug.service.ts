import chalk from 'chalk';
import { EnvService } from './env.service';

export class DebugService {
  static debug(...args: any[]): void {
    if (EnvService.isDev()) {
      console.log(`[${chalk.blue.bold('DEBUG')}]`, ...args);
    }
  }

  static log(...args: any[]): void {
    console.log(`[${chalk.green.bold('LOG')}]`, ...args);
  }

  static warn(...args: any[]): void {
    console.log(`[${chalk.yellow.bold('WARN')}]`, ...args);
  }

  static error(...args: any[]): void {
    console.log(`[${chalk.red.bold('ERROR')}]`, ...args);
  }
}
