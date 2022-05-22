import chalk from 'chalk';
import { Client, Intents, Message } from 'discord.js';
import { ICommand } from '../@types/command.interface';
import { DebugService } from '../services/debug.service';

export class Bot {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private loadCommand(message: Message) {
    const command = message.content.split(' ')[0].replace('!', '');
    const args = message.content.split(' ').slice(1);

    const commandFile = require(`./commands/${command}.command`);
    const commandClass = new commandFile.default() as ICommand;

    DebugService.log(
      'Command',
      chalk.yellow(commandClass.name),
      'was called by',
      chalk.cyan(message.author.tag)
    );

    if (commandClass.description != '') {
      DebugService.info('Description:', chalk.gray(commandClass.description));
    }

    commandClass.execute(message, args);
  }

  public run(): void {
    const client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    client.on('ready', () => {
      DebugService.log(`Logged in as ${client.user?.tag}`);
    });

    client.on('messageCreate', (message) => {
      if (message.author.bot) {
        return;
      }

      if (message.content.startsWith('!')) {
        this.loadCommand(message);
      }
    });

    client.login(this.token);
  }
}
