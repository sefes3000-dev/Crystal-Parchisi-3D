import * as THREE from "three";
import ModelLoader from "../graphics/ModelLoader.js";
import DicePhysics from "./DicePhysics.js";
import DiceAnimator from "./DiceAnimator.js";
import DiceValueReader from "./DiceValueReader.js";
import DiceConfig from "./DiceConfig.js";

export default class DiceManager {

    constructor(scene, physics) {

        this.scene = scene;
        this.physics = physics;

        this.loader = new ModelLoader();

        this.physicsSystem = null;
        this.animator = new DiceAnimator();

        this.meshes = [];
        this.bodies = [];

        this.values = [1, 1];

        this.isRolling = false;

    }

    async init() {

        this.physicsSystem = new DicePhysics(this.physics.world);

        for (let i = 0; i < DiceConfig.COUNT; i++) {

            await this.createDice(i);

        }

        console.log("Dice Manager Ready");

    }

    async createDice(index) {

        let mesh;

        try {

            mesh = await this.loader.load("/models/dice.glb");

        } catch {

            mesh = new THREE.Mesh(

                new THREE.BoxGeometry(
                    DiceConfig.SIZE,
                    DiceConfig.SIZE,
                    DiceConfig.SIZE
                ),

                new THREE.MeshStandardMaterial({
                    color: 0xffffff
                })

            );

        }

        mesh.castShadow = true;

        mesh.position.set(

            index * 1.5 - 0.75,

            DiceConfig.START_HEIGHT,

            0

        );

        this.scene.add(mesh);

        const body = this.physicsSystem.createBody(mesh.position);

        this.animator.add(mesh, body);

        this.meshes.push(mesh);

        this.bodies.push(body);

    }

    roll() {

        if (this.isRolling) return;

        this.isRolling = true;

        this.bodies.forEach(body => {

            this.physicsSystem.throw(body);

        });

    }

    update() {

        this.animator.update();

        if (!this.isRolling) return;

        let sleeping = true;

        this.bodies.forEach(body => {

            if (body.velocity.length() > 0.1) {

                sleeping = false;

            }

        });

        if (sleeping) {

            this.values = this.meshes.map(mesh =>
                DiceValueReader.getValue(mesh)
            );

            console.log("Dice Result:", this.values);

            this.isRolling = false;

        }

    }

    getValues() {

        return this.values;

    }

}
