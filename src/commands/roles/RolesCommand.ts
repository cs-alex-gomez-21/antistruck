import Command from '../../utils/Command'
import { SlashCommandBuilder } from '@discordjs/builders'
import { CollectorFilter, CommandInteraction, GuildMemberRoleManager, Interaction, MessageActionRow, SelectMenuInteraction } from 'discord.js'
import PronounRoleSelector from './selectors/PronounRoleSelector'
import AgeRoleSelector from './selectors/AgeRoleSelector'

const commandBuilder = new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Get yourself some roles')
    .addStringOption(option => {
        return option
            .setName('category')
            .setDescription('Pronoun/Age')
            .setRequired(true)
            .addChoice('Pronoun', 'pronoun')
            .addChoice('Age', 'age')
    })
export default class RolesCommand extends Command {
    constructor() {super(commandBuilder as SlashCommandBuilder)}

    async execute(interaction: CommandInteraction) {
        const filter : CollectorFilter<any[]> = (i: SelectMenuInteraction) => {i.deferUpdate();return i.user.id === interaction.user.id}
        if (interaction.options.getString('category') == 'pronoun') {
            // Pronoun role selector
            const possibleRoles = ['746565062528991333', '746565082716176534', '746565089506623518', '802044284621553744']
            await interaction.reply({content: 'Select Roles:', components: [new PronounRoleSelector()]})
            const result = (await interaction.channel?.awaitMessageComponent({filter, componentType: 'SELECT_MENU', time: 60000}))!.values
            const memberRoles = interaction.member.roles as GuildMemberRoleManager
            possibleRoles.forEach(role => {
                if (!!memberRoles.resolve(role)) memberRoles.remove(role)
            })
            result.forEach(role => {
                memberRoles.add(role)
            })
            interaction.channel?.send('Roles saved successfully!')
        } else {
            // Age role selector
            const possibleRoles = ['767172314580123679', '767172317087399956']
            await interaction.reply({content: 'Select Roles:', components: [new AgeRoleSelector()]})
            const result = (await interaction.channel?.awaitMessageComponent({filter, componentType: 'SELECT_MENU', time: 60000}))!.values[0]
            const memberRoles = interaction.member.roles as GuildMemberRoleManager
            if (result == possibleRoles[1] && !!memberRoles.resolve(possibleRoles[0])) {
                interaction.channel?.send('You cannot remove the adult role.')
            } else {
                possibleRoles.forEach(role => {
                    if (!!memberRoles.resolve(role)) memberRoles.remove(role)
                })
                memberRoles.add(result)
                interaction.channel?.send('Role saved successfully!')
            }
        }
        
        // interaction.channel?.awaitMessageComponent({filter, componentType: 'SELECT_MENU', time: 60000})
        //     .then(i => {
        //         const roles = i.member.roles as GuildMemberRoleManager
        //         const hasRole = !!roles.resolve(i.values[0])
        //         interaction.editReply({content: 'Command under development', components: []})

        //     })
        //     .catch(e => console.error(e))
        
    }
    
}