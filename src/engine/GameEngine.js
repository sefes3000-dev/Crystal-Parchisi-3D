import ThreeManager from "../graphics/ThreeManager.js";
import { GameState } from "./GameState.js";
import Core from "../core/Core.js";

export default class GameEngine {

    constructor(canvas) {

        this.canvas = canvas;

        this.core = new Core();

        this.graphics = new ThreeManager(canvas);

        this.state = GameState.BOOT;

        this.started = false;

        this.version = "0.1.0";

    }

    async init() {

        this.changeState(GameState.LOADING);

        // تحميل الموارد
        await this.core.assets.load();

        // تشغيل محرك الرسوميات
        this.graphics.init();

        this.changeState(GameState.MAIN_MENU);

        this.started = true;

        console.log("Crystal Parchisi 3D Ready");

    }

    update(delta = 0) {

        if (!this.started) return;

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
