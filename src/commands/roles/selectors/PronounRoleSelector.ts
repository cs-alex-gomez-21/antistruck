import { MessageActionRow, MessageSelectMenu, MessageSelectOption } from 'discord.js'

class PronounRoleMenu extends MessageSelectMenu {
    customId = 'dropdown'
    placeholder = 'Select Pronouns'
    options = [
        {
            label: 'He/Him',
            description: 'Pronoun Role',
            value: '746565062528991333',
        },
        {
            label: 'She/Her',
            description: 'Pronoun Role',
            value: '746565082716176534',
        },
        {
            label: 'They/Them',
            description: 'Pronoun Role',
            value: '746565089506623518',
        },
        {
            label: 'Any/Other',
            description: 'Pronoun Role',
            value: '802044284621553744',
        }
    ] as Array<MessageSelectOption>
    maxValues = 2
}
export default class PronounRoleSelector extends MessageActionRow {
    components = [new PronounRoleMenu()]
}