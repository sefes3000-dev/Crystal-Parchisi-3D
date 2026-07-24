import EventBus from "./EventBus.js";
import AssetManager from "./AssetManager.js";

export default class Core {

    constructor() {

        this.initialized = false;

        this.events = new EventBus();

        this.assets = new AssetManager();

        this.services = new Map();

        this.debug = false;

    }

    async init() {

        if (this.initialized) return;

        await this.assets.load();

        this.initialized = true;

        this.events.emit("core:ready");

    }

    register(name, service) {

        if (this.services.has(name)) {

            console.warn(`Service '${name}' already registered.`);

            return;

        }

        this.services.set(name, service);

    }

    get(name) {

        return this.services.get(name);

    }

    has(name) {

        return this.services.has(name);

    }

    remove(name) {

        if (!this.services.has(name)) return;

        const service = this.services.get(name);

        if (service && typeof service.dispose === "function") {

            service.dispose();

        }

        this.services.delete(name);

    }

    setDebug(enabled) {

        this.debug = enabled;

    }

    log(...args) {

        if (this.debug) {

            console.log("[Core]", ...args);

        }

    }

    dispose() {

        for (const [, service] of this.services) {

            if (service && typeof service.dispose === "function") {

                service.dispose();

            }

        }

        this.services.clear();

        if (this.assets && typeof this.assets.dispose === "function") {

            this.assets.dispose();

        }

        if (this.events && typeof this.events.clear === "function") {

            this.events.clear();

        }

        this.initialized = false;

    }

}
