import Client from "../utils/Client";
import Event from "../utils/Event";

export default class ReadyEvent extends Event {
    constructor() {
        super('ready')
    }
    async execute(client: Client) {
        console.info(`Logged in as ${client.user?.username}`)
    }
}