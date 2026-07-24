import EventBus from "./EventBus.js";

export default class Core {

    constructor() {

        this.events = new EventBus();

        console.log("Core Initialized");

    }

}
