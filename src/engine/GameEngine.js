import ThreeManager from "../graphics/ThreeManager.js";
import { GameState } from "./GameState.js";
import Core from "../core/Core.js";
import PhysicsManager from "../physics/PhysicsManager.js";

export default class GameEngine {

    constructor(canvas) {

        this.canvas = canvas;

        this.core = new Core();

        this.physics = new PhysicsManager();

        this.graphics = new ThreeManager(
            canvas,
            this.physics
        );

        this.state = GameState.BOOT;

        this.started = false;

        this.lastTime = performance.now();

    }

    async init() {

        this.changeState(GameState.LOADING);

        await this.core.assets.load();

        this.physics.init();

        await this.graphics.init();

        this.changeState(GameState.MAIN_MENU);

        this.started = true;

    }

    update() {

        if (!this.started) return;

        const now = performance.now();

        const delta = (now - this.lastTime) / 1000;

        this.lastTime = now;

        this.physics.update(delta);

        this.graphics.update(delta);

    }

    render() {

        if (!this.started) return;

        this.graphics.render();

    }

    changeState(state) {

        if (this.state === state) return;

        this.state = state;

        this.core.events.emit(
            "stateChanged",
            state
        );

    }

}
