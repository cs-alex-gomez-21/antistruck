import * as path from 'path'
import { config } from 'dotenv'
import { Intents } from 'discord.js'
import loadCommands from './utils/loadCommands'
import Client from './utils/Client'
import loadEvents from './utils/loadEvents'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'

(async () => {
    config()
    const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]})
    await loadEvents(path.join(__dirname, 'events'), client)
    await loadCommands(path.join(__dirname, 'commands'), client)
    
    const rest = new REST({version: '9'}).setToken(process.env.TOKEN as string)
    const commandBody = client.commands.array().map(command => command.data).map(command => command.toJSON())
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENTID as string, process.env.GUILDID as string), {body: commandBody})
    
    await client.login(process.env.TOKEN)
})()