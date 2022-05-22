import { Message } from 'discord.js';

export interface ICommand {
  name: string;
  description: string;
  usage: string;

  execute(message: Message, args: string[]): void;
}
