import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class ModelLoader {

    constructor() {

        this.loader = new GLTFLoader();

        this.cache = new Map();

    }

    async load(path) {

        if (this.cache.has(path)) {

            return this.cache.get(path).clone(true);

        }

        return new Promise((resolve, reject) => {

            this.loader.load(

                path,

                (gltf) => {

                    this.cache.set(path, gltf.scene);

                    resolve(gltf.scene.clone(true));

                },

                undefined,

                (error) => {

                    reject(error);

                }

            );

        });

    }

}
