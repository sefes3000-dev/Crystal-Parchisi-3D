import ThreeManager from "../graphics/ThreeManager.js";
import { GameState } from "./GameState.js";
import Core from "../core/Core.js";
import PhysicsManager from "../physics/PhysicsManager.js";

export default class GameEngine {

    constructor(canvas) {

        this.canvas = canvas;

        this.core = new Core();

        this.graphics = new ThreeManager(canvas);

        this.physics = new PhysicsManager();

        this.state = GameState.BOOT;

        this.started = false;

        this.version = "0.1.0";

        this.lastTime = performance.now();

    }

    async init() {

        this.changeState(GameState.LOADING);

        await this.core.assets.load();

        this.physics.init();

        await this.graphics.init();

        this.changeState(GameState.MAIN_MENU);

        this.started = true;

        console.log("Crystal Engine Ready");

    }

    update() {

        if (!this.started) return;

        const now = performance.now();

        const delta = (now - this.lastTime) / 1000;

        this.lastTime = now;

        this.physics.update(delta);

    }

    render() {

        if (!this.started) return;

        this.graphics.render();

    }

    changeState(state) {

        if (this.state === state) return;

        this.state = state;

        this.core.events.emit("stateChanged", state);

    }

}
