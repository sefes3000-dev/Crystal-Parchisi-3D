import * as THREE from "three";

export default class MaterialManager {

    constructor() {

        this.materials = new Map();

        this.createDefaultMaterials();

    }

    createDefaultMaterials() {

        this.materials.set("glass",

            new THREE.MeshPhysicalMaterial({

                color: 0xffffff,

                transmission: 1,

                transparent: true,

                opacity: 1,

                roughness: 0.05,

                metalness: 0,

                thickness: 0.6,

                ior: 1.52,

                clearcoat: 1,

                clearcoatRoughness: 0

            })

        );

        this.materials.set("crystal",

            new THREE.MeshPhysicalMaterial({

                color: 0x7de3ff,

                transmission: 0.9,

                transparent: true,

                roughness: 0.08,

                thickness: 1,

                ior: 1.5,

                clearcoat: 1

            })

        );

        this.materials.set("gold",

            new THREE.MeshStandardMaterial({

                color: 0xffd700,

                metalness: 1,

                roughness: 0.15

            })

        );

        this.materials.set("lava",

            new THREE.MeshStandardMaterial({

                color: 0xff5500,

                emissive: 0xff3300,

                emissiveIntensity: 2,

                roughness: 0.4,

                metalness: 0.2

            })

        );

    }

    get(name) {

        return this.materials.get(name);

    }

}
