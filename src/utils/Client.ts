import Collection from '@discordjs/collection'
import { Client as DJSClient, ClientOptions} from 'discord.js'
import Command from './Command'
import Event from './Event'

export default class Client extends DJSClient {
    public commands: Collection<string, Command> = new Collection()
    public events: Collection<string, Event> = new Collection()
    constructor (options: ClientOptions) {
        super(options)
    }
}