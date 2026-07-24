import ThreeManager from "../graphics/ThreeManager.js";

export default class GameEngine {

    constructor(canvas) {

        this.canvas = canvas;

        this.graphics = new ThreeManager(canvas);

        this.started = false;

    }

    async init() {

        console.log("Initializing Game Engine...");

        this.graphics.init();

        this.started = true;

        console.log("Game Engine Ready.");

    }

    update() {

        if (!this.started) return;

    }

    render() {

        if (!this.started) return;

        this.graphics.render();

    }

}
