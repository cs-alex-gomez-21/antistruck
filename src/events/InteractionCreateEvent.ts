import { Interaction } from 'discord.js';
import Client from '../utils/Client';
import Event from '../utils/Event'

export default class InteractionCreateEvent extends Event {
    constructor() {
        super('interactionCreate')
    }
    async execute(interaction: Interaction, client: Client) {
        if (!interaction.isCommand()) return
        const command = client.commands.array().filter(cmd => cmd.data.name == interaction.commandName)[0]
        if (!command) return
        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}