import * as THREE from "three";

import CameraManager from "./CameraManager.js";
import MaterialManager from "./MaterialManager.js";
import LightingManager from "./LightingManager.js";
import PostProcessing from "./PostProcessing.js";

import BoardManager from "../board/BoardManager.js";
import DiceManager from "../dice/DiceManager.js";

export default class ThreeManager {

    constructor(canvas, physics) {

        this.canvas = canvas;
        this.physics = physics;

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.materials = null;
        this.cameraManager = null;
        this.lighting = null;
        this.postProcessing = null;

        this.boardManager = null;
        this.diceManager = null;

        this.clock = new THREE.Clock();

        this.mixers = [];

        this.onResize = this.onResize.bind(this);

    }

    async init() {

        this.createScene();

        this.createCamera();

        this.createRenderer();

        this.materials = new MaterialManager();

        this.cameraManager = new CameraManager(
            this.camera
        );

        this.cameraManager.init();

        this.lighting = new LightingManager(
            this.scene,
            this.renderer
        );

        this.lighting.init();

        this.postProcessing = new PostProcessing(
            this.renderer,
            this.scene,
            this.camera
        );

        this.postProcessing.init();

        this.boardManager = new BoardManager(
            this.scene,
            this.materials
        );

        await this.boardManager.init();

        this.diceManager = new DiceManager(

            this.scene,

            this.physics,

            this.materials

        );

        await this.diceManager.init();

        this.onResize();

        window.addEventListener(

            "resize",

            this.onResize

        );

    }

    createScene() {

        this.scene = new THREE.Scene();

        this.scene.background =

            new THREE.Color(0x1b1b1b);

        this.scene.fog = new THREE.Fog(

            0x1b1b1b,

            20,

            45

        );

    }

    createCamera() {

        this.camera = new THREE.PerspectiveCamera(

            45,

            window.innerWidth /

            window.innerHeight,

            0.1,

            100

        );

    }

    createRenderer() {

        this.renderer = new THREE.WebGLRenderer({

            canvas: this.canvas,

            antialias: true,

            alpha: false

        });

        this.renderer.setPixelRatio(

            Math.min(

                window.devicePixelRatio,

                2

            )

        );

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

    add(object) {

        this.scene.add(object);

    }

    remove(object) {

        this.scene.remove(object);

    }

    addMixer(mixer) {

        this.mixers.push(mixer);

    }

    removeMixer(mixer) {

        this.mixers = this.mixers.filter(

            m => m !== mixer

        );

    }

    update(delta = this.clock.getDelta()) {

        if (this.cameraManager) {

            this.cameraManager.update(delta);

        }

        if (this.boardManager) {

            this.boardManager.update(delta);

        }

        if (this.diceManager) {

            this.diceManager.update(delta);

        }

        if (this.lighting) {

            this.lighting.update(delta);

        }

        for (const mixer of this.mixers) {

            mixer.update(delta);

        }

    }

    render() {

        if (this.postProcessing) {

            this.postProcessing.render();

        } else {

            this.renderer.render(

                this.scene,

                this.camera

            );

        }

    }

    onResize() {

        const width = window.innerWidth;

        const height = window.innerHeight;

        this.camera.aspect = width / height;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            width,

            height

        );

        if (this.postProcessing) {

            this.postProcessing.resize(

                width,

                height

            );

        }

    }

    dispose() {

        window.removeEventListener(

            "resize",

            this.onResize

        );

        if (this.boardManager?.dispose) {

            this.boardManager.dispose();

        }

        if (this.diceManager?.dispose) {

            this.diceManager.dispose();

        }

        if (this.lighting?.dispose) {

            this.lighting.dispose();

        }

        if (this.postProcessing?.dispose) {

            this.postProcessing.dispose();

        }

        this.renderer.dispose();

    }

}
