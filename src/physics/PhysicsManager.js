import * as CANNON from "cannon-es";

export default class PhysicsManager {

    constructor() {

        this.world = null;

    }

    init() {

        this.world = new CANNON.World();

        this.world.gravity.set(0, -9.82, 0);

        this.world.allowSleep = true;

        console.log("Physics Ready");

    }

    update(delta) {

        if (!this.world) return;

        this.world.step(1 / 60, delta);

    }

}
