import readdir from 'recursive-readdir'
import Client from './Client'

export default async function loadEvents(path: string, client: Client) {
    const files = await readdir(path)
    let eventPathArray = files.filter(file => file.endsWith('Event.ts') || file.endsWith('Event.js'))
    eventPathArray.forEach(eventPath => client.events.set(eventPath, new (require(eventPath).default)()))
    client.events.array().forEach(event => {
        client.on(event.name, E => {
            event.execute(E, client)
        })
        
    })
}

