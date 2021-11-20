import readdir from 'recursive-readdir'
import Client from './Client'



export default async function loadCommands(path: string, client: Client) {
    const files = await readdir(path)
    let commandPathArray = files.filter(file => file.endsWith('Command.ts') || file.endsWith('Command.js'))
    commandPathArray.forEach(commandPath => client.commands.set(commandPath, new (require(commandPath).default)()))
    
    console.info('Commands loaded')
}