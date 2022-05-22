import { Message } from 'discord.js';
import { ICommand } from '../../@types/command.interface';

export default class HelloCommand implements ICommand {
  name: string = 'hello';
  description: string = 'Say hello to the bot';
  usage: string = 'hello';

  execute(message: Message, args: string[]): void {
    message.reply(`Hello ${message.author.username}`);
  }
}
