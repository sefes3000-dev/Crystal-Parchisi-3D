import * as THREE from "three";
import CameraManager from "./CameraManager.js";
import BoardManager from "../board/BoardManager.js";
import MaterialManager from "./MaterialManager.js";
import DiceManager from "../dice/DiceManager.js";

export default class ThreeManager {

    constructor(canvas, physics) {

        this.canvas = canvas;

        this.physics = physics;

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.cameraManager = null;
        this.boardManager = null;
        this.diceManager = null;

        this.materials = new MaterialManager();

    }

    async init() {

        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLights();

        this.cameraManager = new CameraManager(this.camera);
        this.cameraManager.init();

        this.boardManager = new BoardManager(this.scene);
        await this.boardManager.init();

        this.diceManager = new DiceManager(
            this.scene,
            this.physics
        );

        await this.diceManager.init();

        this.resize();

        window.addEventListener(
            "resize",
            () => this.resize()
        );

    }

    createScene() {

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0x202020);

    }

    createCamera() {

        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

    }

    createRenderer() {

        this.renderer = new THREE.WebGLRenderer({

            canvas: this.canvas,

            antialias: true

        });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.shadowMap.enabled = true;

    }

    createLights() {

        const ambient = new THREE.AmbientLight(0xffffff, 1);

        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xffffff, 2);

        sun.position.set(10, 20, 10);

        sun.castShadow = true;

        this.scene.add(sun);

    }

    resize() {

        this.camera.aspect =
            window.innerWidth / window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }

    update(delta) {

        if (this.diceManager) {

            this.diceManager.update(delta);

        }

        this.cameraManager.update();

    }

    render() {

        this.renderer.render(
            this.scene,
            this.camera
        );

    }

}
