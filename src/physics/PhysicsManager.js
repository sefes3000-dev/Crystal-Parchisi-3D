import * as CANNON from "cannon-es";

export default class PhysicsManager {

    constructor() {

        this.world = null;

        this.fixedTimeStep = 1 / 60;

        this.maxSubSteps = 5;

        this.bodies = [];

        this.materials = new Map();

        this.contactMaterials = [];

        this.enabled = true;

    }

    init() {

        this.world = new CANNON.World({

            gravity: new CANNON.Vec3(0, -9.82, 0)

        });

        this.world.allowSleep = true;

        this.world.broadphase = new CANNON.SAPBroadphase(this.world);

        this.createDefaultMaterials();

        this.createGround();

        console.log("Physics Engine Ready");

    }

    createDefaultMaterials() {

        const defaultMaterial = new CANNON.Material("default");

        this.materials.set("default", defaultMaterial);

        const contact = new CANNON.ContactMaterial(

            defaultMaterial,

            defaultMaterial,

            {

                friction: 0.4,

                restitution: 0.25

            }

        );

        this.world.addContactMaterial(contact);

        this.contactMaterials.push(contact);

    }

    createGround() {

        const shape = new CANNON.Plane();

        const body = new CANNON.Body({

            mass: 0,

            material: this.materials.get("default"),

            shape

        });

        body.quaternion.setFromEuler(

            -Math.PI / 2,

            0,

            0

        );

        this.world.addBody(body);

        this.bodies.push(body);

    }

    addBody(body) {

        this.world.addBody(body);

        this.bodies.push(body);

    }

    removeBody(body) {

        this.world.removeBody(body);

        this.bodies = this.bodies.filter(b => b !== body);

    }

    update(delta) {

        if (!this.world || !this.enabled) return;

        this.world.step(

            this.fixedTimeStep,

            delta,

            this.maxSubSteps

        );

    }

    setGravity(x, y, z) {

        this.world.gravity.set(x, y, z);

    }

    pause() {

        this.enabled = false;

    }

    resume() {

        this.enabled = true;

    }

    clear() {

        for (const body of this.bodies) {

            this.world.removeBody(body);

        }

        this.bodies = [];

    }

    dispose() {

        this.clear();

        this.materials.clear();

        this.contactMaterials = [];

        this.world = null;

    }

}
