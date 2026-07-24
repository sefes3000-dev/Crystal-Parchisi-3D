export default class AssetManager {

    constructor() {

        this.textures = new Map();
        this.models = new Map();
        this.sounds = new Map();
        this.fonts = new Map();

        this.queue = [];

        this.loaded = false;

        this.loading = false;

    }

    registerTexture(name, loader) {

        this.queue.push({
            type: "texture",
            name,
            loader
        });

    }

    registerModel(name, loader) {

        this.queue.push({
            type: "model",
            name,
            loader
        });

    }

    registerSound(name, loader) {

        this.queue.push({
            type: "sound",
            name,
            loader
        });

    }

    registerFont(name, loader) {

        this.queue.push({
            type: "font",
            name,
            loader
        });

    }

    async load() {

        if (this.loaded) return;

        this.loading = true;

        console.log("Loading Assets...");

        for (const asset of this.queue) {

            try {

                const data = await asset.loader();

                switch (asset.type) {

                    case "texture":
                        this.textures.set(asset.name, data);
                        break;

                    case "model":
                        this.models.set(asset.name, data);
                        break;

                    case "sound":
                        this.sounds.set(asset.name, data);
                        break;

                    case "font":
                        this.fonts.set(asset.name, data);
                        break;

                }

                console.log(`Loaded ${asset.type}: ${asset.name}`);

            } catch (error) {

                console.error(
                    `Failed loading ${asset.name}`,
                    error
                );

            }

        }

        this.loaded = true;

        this.loading = false;

        console.log("Assets Loaded");

    }

    getTexture(name) {

        return this.textures.get(name);

    }

    getModel(name) {

        return this.models.get(name);

    }

    getSound(name) {

        return this.sounds.get(name);

    }

    getFont(name) {

        return this.fonts.get(name);

    }

    hasTexture(name) {

        return this.textures.has(name);

    }

    hasModel(name) {

        return this.models.has(name);

    }

    hasSound(name) {

        return this.sounds.has(name);

    }

    hasFont(name) {

        return this.fonts.has(name);

    }

    unloadTexture(name) {

        this.textures.delete(name);

    }

    unloadModel(name) {

        this.models.delete(name);

    }

    unloadSound(name) {

        this.sounds.delete(name);

    }

    unloadFont(name) {

        this.fonts.delete(name);

    }

    dispose() {

        this.textures.clear();

        this.models.clear();

        this.sounds.clear();

        this.fonts.clear();

        this.queue = [];

        this.loaded = false;

        this.loading = false;

    }

}
