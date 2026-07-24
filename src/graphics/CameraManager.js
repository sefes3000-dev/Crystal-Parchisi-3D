import * as THREE from "three";

export default class CameraManager {

    constructor(camera) {

        this.camera = camera;

        this.target = new THREE.Vector3();

        this.currentPosition = new THREE.Vector3();
        this.desiredPosition = new THREE.Vector3();

        this.defaultPosition = new THREE.Vector3(0, 12, 12);
        this.topPosition = new THREE.Vector3(0, 22, 0.01);

        this.followTarget = null;

        this.currentMode = "DEFAULT";

        this.smoothSpeed = 5;

        this.minZoom = 6;
        this.maxZoom = 30;

    }

    init() {

        this.reset();

    }

    reset() {

        this.currentMode = "DEFAULT";

        this.currentPosition.copy(this.defaultPosition);

        this.desiredPosition.copy(this.defaultPosition);

        this.camera.position.copy(this.currentPosition);

        this.camera.lookAt(this.target);

    }

    setTopView() {

        this.currentMode = "TOP";

        this.desiredPosition.copy(this.topPosition);

    }

    setDefaultView() {

        this.currentMode = "DEFAULT";

        this.desiredPosition.copy(this.defaultPosition);

    }

    follow(object3D) {

        this.followTarget = object3D;

    }

    clearFollow() {

        this.followTarget = null;

    }

    zoom(amount) {

        const direction = this.camera.position.clone().normalize();

        let distance = this.camera.position.length();

        distance += amount;

        distance = THREE.MathUtils.clamp(
            distance,
            this.minZoom,
            this.maxZoom
        );

        this.desiredPosition.copy(
            direction.multiplyScalar(distance)
        );

    }

    rotateY(angle) {

        const offset = this.desiredPosition.clone();

        offset.applyAxisAngle(
            new THREE.Vector3(0,1,0),
            angle
        );

        this.desiredPosition.copy(offset);

    }

    update(delta = 0.016) {

        if (this.followTarget) {

            this.target.lerp(

                this.followTarget.position,

                delta * this.smoothSpeed

            );

        }

        this.currentPosition.lerp(

            this.desiredPosition,

            delta * this.smoothSpeed

        );

        this.camera.position.copy(this.currentPosition);

        this.camera.lookAt(this.target);

    }

}
