import * as THREE from "three";
import * as CANNON from "cannon-es";

export default class DiceManager {

    constructor(scene, physics, materials) {

        this.scene = scene;
        this.physics = physics;
        this.materials = materials;

        this.mesh = null;
        this.body = null;

        this.size = 0.8;

        this.isRolling = false;
        this.currentValue = 1;

    }

    async init() {

        this.createDice();

    }

    createDice() {

        const geometry = new THREE.BoxGeometry(

            this.size,
            this.size,
            this.size

        );

        const material = this.materials.get("glass");

        this.mesh = new THREE.Mesh(

            geometry,

            material

        );

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.mesh.position.set(

            0,
            3,
            0

        );

        this.scene.add(this.mesh);

        const shape = new CANNON.Box(

            new CANNON.Vec3(

                this.size / 2,

                this.size / 2,

                this.size / 2

            )

        );

        this.body = new CANNON.Body({

            mass: 1,

            shape,

            material: this.physics.materials.get("default")

        });

        this.body.position.set(

            0,
            3,
            0

        );

        this.physics.addBody(

            this.body

        );

    }

    roll() {

        if (this.isRolling) return;

        this.isRolling = true;

        this.body.velocity.set(

            (Math.random() - 0.5) * 8,

            8,

            (Math.random() - 0.5) * 8

        );

        this.body.angularVelocity.set(

            Math.random() * 20,

            Math.random() * 20,

            Math.random() * 20

        );

    }

    update() {

        if (!this.mesh || !this.body) return;

        this.mesh.position.copy(

            this.body.position

        );

        this.mesh.quaternion.copy(

            this.body.quaternion

        );

        if (

            this.isRolling &&

            this.body.velocity.length() < 0.1 &&

            this.body.angularVelocity.length() < 0.1

        ) {

            this.isRolling = false;

            this.currentValue = this.readValue();

            console.log(

                "Dice:",

                this.currentValue

            );

        }

    }

    readValue() {

        const up = new THREE.Vector3(0,1,0);

        const faces = [

            new THREE.Vector3(0,1,0),
            new THREE.Vector3(0,-1,0),
            new THREE.Vector3(1,0,0),
            new THREE.Vector3(-1,0,0),
            new THREE.Vector3(0,0,1),
            new THREE.Vector3(0,0,-1)

        ];

        let best = 0;
        let max = -1;

        for(let i=0;i<faces.length;i++){

            const dir = faces[i].clone();

            dir.applyQuaternion(

                this.mesh.quaternion

            );

            const dot = dir.dot(up);

            if(dot > max){

                max = dot;

                best = i;

            }

        }

        return [

            1,
            6,
            3,
            4,
            2,
            5

        ][best];

    }

    getValue() {

        return this.currentValue;

    }

    dispose() {

        if(this.mesh){

            this.scene.remove(this.mesh);

        }

        if(this.body){

            this.physics.removeBody(

                this.body

            );

        }

    }

}
