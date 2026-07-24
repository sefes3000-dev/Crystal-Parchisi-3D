import * as THREE from "three";

export default class CameraManager {

    constructor(camera) {

        this.camera = camera;

        this.target = new THREE.Vector3(0, 0, 0);

        this.defaultPosition = new THREE.Vector3(0, 12, 12);

        this.topPosition = new THREE.Vector3(0, 22, 0.01);

        this.currentMode = "DEFAULT";

    }

    init() {

        this.reset();

    }

    reset() {

        this.camera.position.copy(this.defaultPosition);

        this.camera.lookAt(this.target);

        this.currentMode = "DEFAULT";

    }

    setTopView() {

        this.camera.position.copy(this.topPosition);

        this.camera.lookAt(this.target);

        this.currentMode = "TOP";

    }

    zoom(delta) {

        this.camera.position.multiplyScalar(delta);

    }

    update() {

        this.camera.lookAt(this.target);

    }

}
