import { Bot } from './bot';
import { ConfigService } from '../services/config.service';
import { EnvKeyStore } from '../store/env-key.store';

export function main() {
  ConfigService.printEnvKeys();

  const bot = new Bot(ConfigService.get(EnvKeyStore.BOT_TOKEN));
  bot.run();
}
