import {
    EffectComposer
} from "three/examples/jsm/postprocessing/EffectComposer.js";

import {
    RenderPass
} from "three/examples/jsm/postprocessing/RenderPass.js";

import {
    UnrealBloomPass
} from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import {
    OutputPass
} from "three/examples/jsm/postprocessing/OutputPass.js";

import * as THREE from "three";

export default class PostProcessing {

    constructor(renderer, scene, camera) {

        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;

        this.composer = null;
        this.renderPass = null;
        this.bloomPass = null;
        this.outputPass = null;

    }

    init() {

        this.composer = new EffectComposer(this.renderer);

        this.renderPass = new RenderPass(
            this.scene,
            this.camera
        );

        this.composer.addPass(this.renderPass);

        this.bloomPass = new UnrealBloomPass(

            new THREE.Vector2(

                window.innerWidth,

                window.innerHeight

            ),

            0.8,
            0.4,
            0.9

        );

        this.composer.addPass(
            this.bloomPass
        );

        this.outputPass = new OutputPass();

        this.composer.addPass(
            this.outputPass
        );

    }

    render() {

        this.composer.render();

    }

    resize(width, height) {

        if (!this.composer) return;

        this.composer.setSize(
            width,
            height
        );

    }

    setBloom(
        strength,
        radius,
        threshold
    ) {

        this.bloomPass.strength = strength;

        this.bloomPass.radius = radius;

        this.bloomPass.threshold = threshold;

    }

    dispose() {

        if (!this.composer) return;

        this.composer.dispose();

    }

}
