import * as CANNON from "cannon-es";

export default class PhysicsManager {

    constructor() {

        this.world = null;
        this.fixedTimeStep = 1 / 60;
        this.maxSubSteps = 3;

    }

    init() {

        this.world = new CANNON.World({

            gravity: new CANNON.Vec3(0, -9.82, 0)

        });

        this.world.allowSleep = true;

        this.createGround();

        console.log("Physics Engine Ready");

    }

    createGround() {

        const groundShape = new CANNON.Plane();

        const groundBody = new CANNON.Body({

            mass: 0,

            shape: groundShape

        });

        groundBody.quaternion.setFromEuler(

            -Math.PI / 2,

            0,

            0

        );

        this.world.addBody(groundBody);

    }

    update(delta) {

        if (!this.world) return;

        this.world.step(

            this.fixedTimeStep,

            delta,

            this.maxSubSteps

        );

    }

}
