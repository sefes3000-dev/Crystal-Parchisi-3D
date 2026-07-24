import * as THREE from "three";

export default class MaterialManager {

    constructor() {

        this.materials = new Map();

        this.environmentMap = null;

        this.createDefaultMaterials();

    }

    createDefaultMaterials() {

        this.add(
            "glass",
            new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                transmission: 1,
                transparent: true,
                opacity: 1,
                roughness: 0.03,
                metalness: 0,
                thickness: 0.7,
                ior: 1.52,
                clearcoat: 1,
                clearcoatRoughness: 0,
                envMapIntensity: 1.5
            })
        );

        this.add(
            "crystal",
            new THREE.MeshPhysicalMaterial({
                color: 0x7de3ff,
                transmission: 0.95,
                transparent: true,
                roughness: 0.05,
                thickness: 1,
                ior: 1.5,
                clearcoat: 1,
                envMapIntensity: 2
            })
        );

        this.add(
            "gold",
            new THREE.MeshStandardMaterial({
                color: 0xffd700,
                metalness: 1,
                roughness: 0.12
            })
        );

        this.add(
            "lava",
            new THREE.MeshStandardMaterial({
                color: 0xff5500,
                emissive: 0xff3300,
                emissiveIntensity: 2,
                roughness: 0.35,
                metalness: 0.25
            })
        );

        this.add(
            "wood",
            new THREE.MeshStandardMaterial({
                color: 0x8b5a2b,
                roughness: 0.75,
                metalness: 0
            })
        );

        this.add(
            "plastic",
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.45,
                metalness: 0.1
            })
        );

    }

    add(name, material) {

        this.materials.set(name, material);

    }

    get(name) {

        return this.materials.get(name);

    }

    has(name) {

        return this.materials.has(name);

    }

    remove(name) {

        const material = this.materials.get(name);

        if (!material) return;

        material.dispose();

        this.materials.delete(name);

    }

    setEnvironmentMap(texture) {

        this.environmentMap = texture;

        for (const material of this.materials.values()) {

            material.envMap = texture;
            material.needsUpdate = true;

        }

    }

    clone(name) {

        const material = this.materials.get(name);

        if (!material) return null;

        return material.clone();

    }

    dispose() {

        for (const material of this.materials.values()) {

            material.dispose();

        }

        this.materials.clear();

        this.environmentMap = null;

    }

}
