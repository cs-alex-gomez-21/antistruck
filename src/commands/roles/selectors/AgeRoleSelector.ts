import { MessageActionRow, MessageSelectMenu, MessageSelectOption } from 'discord.js'

class AgeRoleMenu extends MessageSelectMenu {
    customId = 'dropdown'
    placeholder = 'Select Age'
    options = [
        {
            label: 'Adult (18+)',
            description: 'Age Role',
            value: '767172314580123679',
        },
        {
            label: 'Minor (13-17)',
            description: 'Age Role',
            value: '767172317087399956',
        }
    ] as Array<MessageSelectOption>
}
export default class AgeRoleSelector extends MessageActionRow {
    components = [new AgeRoleMenu()]
}