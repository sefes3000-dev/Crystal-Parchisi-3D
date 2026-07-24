export default class DiceAnimator {

    constructor() {

        this.items = [];

    }

    add(mesh, body) {

        this.items.push({

            mesh,

            body

        });

    }

    update() {

        this.items.forEach(item => {

            item.mesh.position.copy(item.body.position);

            item.mesh.quaternion.copy(item.body.quaternion);

        });

    }

}
