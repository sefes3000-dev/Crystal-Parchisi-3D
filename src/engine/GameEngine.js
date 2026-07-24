import ThreeManager from "../graphics/ThreeManager.js";
import { GameState } from "./GameState.js";
import Core from "../core/Core.js";
import PhysicsManager from "../physics/PhysicsManager.js";

import EngineLoop from "./EngineLoop.js";
import Time from "./Time.js";

export default class GameEngine {

    constructor(canvas) {

        this.canvas = canvas;

        this.state = GameState.BOOT;

        this.started = false;

        this.destroyed = false;

        this.core = new Core();

        this.time = new Time();

        this.physics = new PhysicsManager();

        this.graphics = new ThreeManager(
            canvas,
            this.physics
        );

        this.loop = new EngineLoop(this);

        this.onResize = this.onResize.bind(this);

    }

    async init() {

        try {

            this.changeState(GameState.LOADING);

            await this.core.assets.load();

            this.physics.init();

            await this.graphics.init();

            window.addEventListener(
                "resize",
                this.onResize
            );

            this.changeState(GameState.MAIN_MENU);

            this.started = true;

        } catch (error) {

            console.error(
                "GameEngine Init Error:",
                error
            );

        }

    }

    start() {

        if (!this.started) return;

        this.loop.start();

    }

    stop() {

        this.loop.stop();

    }

    pause() {

        this.loop.pause();

    }

    resume() {

        this.loop.resume();

    }

    update(delta) {

        if (!this.started) return;

        this.time.update(delta);

        this.physics.update(
            this.time.getDelta()
        );

        this.graphics.update(
            this.time.getDelta()
        );

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

    onResize() {

        if (
            this.graphics &&
            this.graphics.resize
        ) {

            this.graphics.resize();

        }

    }

    dispose() {

        if (this.destroyed) return;

        this.destroyed = true;

        this.loop.stop();

        window.removeEventListener(
            "resize",
            this.onResize
        );

        if (
            this.graphics &&
            this.graphics.dispose
        ) {

            this.graphics.dispose();

        }

        if (
            this.physics &&
            this.physics.dispose
        ) {

            this.physics.dispose();

        }

        this.started = false;

    }

    getFPS() {

        return this.time.getFPS();

    }

}
