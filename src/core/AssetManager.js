export default class AssetManager {

    constructor() {

        this.textures = new Map();
        this.models = new Map();
        this.sounds = new Map();
        this.fonts = new Map();

    }

    async load() {

        console.log("Loading Assets...");

        // سيتم لاحقًا تحميل:
        // textures
        // glb models
        // sounds
        // fonts

        console.log("Assets Loaded");

    }

    addTexture(name, texture) {

        this.textures.set(name, texture);

    }

    getTexture(name) {

        return this.textures.get(name);

    }

    addModel(name, model) {

        this.models.set(name, model);

    }

    getModel(name) {

        return this.models.get(name);

    }

    addSound(name, sound) {

        this.sounds.set(name, sound);

    }

    getSound(name) {

        return this.sounds.get(name);

    }

}
