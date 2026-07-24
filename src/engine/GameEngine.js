import ThreeManager from "../graphics/ThreeManager.js";
import { GameState } from "./GameState.js";

export default class GameEngine {

    constructor(canvas) {

        this.canvas = canvas;

        // مدير الرسوميات
        this.graphics = new ThreeManager(canvas);

        // حالة اللعبة الحالية
        this.state = GameState.BOOT;

        // هل المحرك بدأ؟
        this.started = false;

        // معلومات الإصدار
        this.version = "0.1.0";

        console.log("====================================");
        console.log(" Crystal Parchisi 3D ");
        console.log(" Version:", this.version);
        console.log("====================================");

    }

    async init() {

        console.log("Loading Engine...");

        this.changeState(GameState.LOADING);

        // تشغيل محرك الرسوميات
        this.graphics.init();

        // لاحقاً سيتم هنا تحميل:
        // Models
        // Textures
        // Sounds
        // Board
        // Dice
        // Pawns

        this.changeState(GameState.MAIN_MENU);

        this.started = true;

        console.log("Engine Ready.");

    }

    update(delta = 0) {

        if (!this.started) return;

        switch (this.state) {

            case GameState.MAIN_MENU:
                this.updateMainMenu(delta);
                break;

            case GameState.WAITING_ROLL:
                this.updateWaitingRoll(delta);
                break;

            case GameState.ROLLING_DICE:
                this.updateRollingDice(delta);
                break;

            case GameState.CHOOSE_PAWN:
                this.updateChoosePawn(delta);
                break;

            case GameState.MOVE_PAWN:
                this.updateMovePawn(delta);
                break;

            case GameState.CAPTURE:
                this.updateCapture(delta);
                break;

            case GameState.BONUS_MOVE:
                this.updateBonusMove(delta);
                break;

            case GameState.END_TURN:
                this.updateEndTurn(delta);
                break;

            case GameState.GAME_OVER:
                this.updateGameOver(delta);
                break;
        }

    }

    render() {

        if (!this.started) return;

        this.graphics.render();

    }

    changeState(newState) {

        if (this.state === newState) return;

        console.log(`State: ${this.state} -> ${newState}`);

        this.state = newState;

    }

    getState() {

        return this.state;

    }

    startGame() {

        this.changeState(GameState.WAITING_ROLL);

    }

    stopGame() {

        this.changeState(GameState.GAME_OVER);

    }

    updateMainMenu(delta) {}

    updateWaitingRoll(delta) {}

    updateRollingDice(delta) {}

    updateChoosePawn(delta) {}

    updateMovePawn(delta) {}

    updateCapture(delta) {}

    updateBonusMove(delta) {}

    updateEndTurn(delta) {}

    updateGameOver(delta) {}

}
