import Command from '../../utils/Command'
import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, GuildMember, MessageEmbed } from 'discord.js'

export default class TestCommand extends Command {
    
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('birthday')
                .setDescription('What birthdays are there today?')
        )
    }
    async execute(interaction: CommandInteraction) {
        const birthdayMembers = (await interaction.guild?.members.fetch())?.filter(member => member.roles.cache.has('603367419888533515'))
        if (birthdayMembers?.size! < 1) return interaction.reply('There are no birthdays today')
        let numString = `There ${birthdayMembers?.size! > 1 ? "are" : "is"} ${birthdayMembers?.size} birthday${birthdayMembers?.size! > 1 ? "s" : ""} today!`
        let memString = ''
        birthdayMembers?.forEach(member => memString += `${member.user.tag}\n`)
        
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('BIRTHDAYS!')
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
            .setDescription(numString)
            .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/56/birthday-cake_1f382.png')
            .addField("Today's birthday list:", memString)
            .setTimestamp()
            .setFooter('Be sure to wish them a happy birthday.', interaction.client.user!.displayAvatarURL());
        await interaction.reply({embeds: [embed]})
    }
    
}