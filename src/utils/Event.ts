import Client from "./Client";

export default abstract class Event {
    constructor (public name: string) {}
    abstract execute(E?:any, client?:Client): Promise<any>
}