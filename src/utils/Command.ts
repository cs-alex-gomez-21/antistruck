import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default abstract class Command {
    constructor (public data: SlashCommandBuilder) {}
    abstract execute(interaction: CommandInteraction) : Promise<any>
}