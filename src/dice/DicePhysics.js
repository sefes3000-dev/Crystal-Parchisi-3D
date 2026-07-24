import * as CANNON from "cannon-es";
import DiceConfig from "./DiceConfig.js";

export default class DicePhysics {

    constructor(world) {

        this.world = world;

        this.bodies = [];

    }

    createBody(position) {

        const shape = new CANNON.Box(

            new CANNON.Vec3(

                DiceConfig.SIZE / 2,
                DiceConfig.SIZE / 2,
                DiceConfig.SIZE / 2

            )

        );

        const body = new CANNON.Body({

            mass: DiceConfig.MASS,

            shape

        });

        body.position.set(

            position.x,
            position.y,
            position.z

        );

        body.linearDamping = DiceConfig.LINEAR_DAMPING;

        body.angularDamping = DiceConfig.ANGULAR_DAMPING;

        this.world.addBody(body);

        this.bodies.push(body);

        return body;

    }

    throw(body) {

        body.velocity.setZero();

        body.angularVelocity.setZero();

        body.position.y = DiceConfig.START_HEIGHT;

        body.applyImpulse(

            new CANNON.Vec3(

                (Math.random() - 0.5) * DiceConfig.THROW_FORCE,

                DiceConfig.THROW_FORCE,

                (Math.random() - 0.5) * DiceConfig.THROW_FORCE

            ),

            body.position

        );

        body.applyTorque(

            new CANNON.Vec3(

                Math.random() * DiceConfig.TORQUE_FORCE,

                Math.random() * DiceConfig.TORQUE_FORCE,

                Math.random() * DiceConfig.TORQUE_FORCE

            )

        );

    }

}
