export default class EventBus {

    constructor() {

        this.events = new Map();

    }

    on(eventName, callback) {

        if (typeof callback !== "function") {

            throw new Error(
                `Event '${eventName}' callback must be a function.`
            );

        }

        if (!this.events.has(eventName)) {

            this.events.set(eventName, new Set());

        }

        this.events.get(eventName).add(callback);

        return () => this.off(eventName, callback);

    }

    once(eventName, callback) {

        const wrapper = (data) => {

            this.off(eventName, wrapper);

            callback(data);

        };

        this.on(eventName, wrapper);

    }

    off(eventName, callback) {

        if (!this.events.has(eventName)) return;

        const listeners = this.events.get(eventName);

        listeners.delete(callback);

        if (listeners.size === 0) {

            this.events.delete(eventName);

        }

    }

    emit(eventName, data = null) {

        if (!this.events.has(eventName)) return;

        const listeners = [...this.events.get(eventName)];

        for (const listener of listeners) {

            try {

                listener(data);

            } catch (error) {

                console.error(
                    `Error while handling '${eventName}'`,
                    error
                );

            }

        }

    }

    has(eventName) {

        return this.events.has(eventName);

    }

    listenerCount(eventName) {

        if (!this.events.has(eventName)) return 0;

        return this.events.get(eventName).size;

    }

    clear(eventName) {

        this.events.delete(eventName);

    }

    clearAll() {

        this.events.clear();

    }

    dispose() {

        this.clearAll();

    }

}
