import * as THREE from "three";

export default class PieceAnimator {

    constructor() {

        this.animations = [];

        this.speed = 4;

    }

    move(piece, target) {

        this.animations.push({

            piece,

            start: piece.mesh.position.clone(),

            end: target.clone(),

            progress: 0

        });

    }

    update(delta) {

        for (let i = this.animations.length - 1; i >= 0; i--) {

            const anim = this.animations[i];

            anim.progress += delta * this.speed;

            if (anim.progress >= 1) {

                anim.piece.mesh.position.copy(anim.end);

                this.animations.splice(i, 1);

                continue;

            }

            anim.piece.mesh.position.lerpVectors(

                anim.start,

                anim.end,

                anim.progress

            );

            anim.piece.mesh.position.y +=

                Math.sin(anim.progress * Math.PI) * 0.18;

        }

    }

    isMoving() {

        return this.animations.length > 0;

    }

}
