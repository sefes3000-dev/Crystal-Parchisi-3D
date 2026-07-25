import ThreeManager from "../graphics/ThreeManager.js";
import { GameState } from "./GameState.js";
import Core from "../core/Core.js";
import PhysicsManager from "../physics/PhysicsManager.js";
import EngineLoop from "./EngineLoop.js";
import Time from "./Time.js";

import GameManager from "../game/GameManager.js";
import PieceManager from "../pieces/PieceManager.js";

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

        this.game = null;

        this.pieceManager = null;

        this.onResize = this.onResize.bind(this);

    }

    async init() {

        try {

            this.changeState(GameState.LOADING);

            await this.core.assets.load();

            this.physics.init();

            await this.graphics.init();

            this.pieceManager =
                this.graphics.pieceManager;

            this.game = new GameManager(

                this.pieceManager,

                this.graphics.diceManager

            );

            this.game.init();

            window.addEventListener(

                "resize",

                this.onResize

            );

            this.changeState(

                GameState.MAIN_MENU

            );

            this.started = true;

        }

        catch(error){

            console.error(

                "GameEngine Init Error",

                error

            );

        }

    }

    start(){

        if(!this.started) return;

        this.loop.start();

    }

    stop(){

        this.loop.stop();

    }

    pause(){

        this.loop.pause();

    }

    resume(){

        this.loop.resume();

    }

    beforeUpdate(delta){

    }

    update(delta){

        if(!this.started) return;

        this.time.update(delta);

        const dt = this.time.getDelta();

        this.physics.update(dt);

        this.graphics.update(dt);

        if(this.game){

            this.game.update(dt);

        }

    }

    afterUpdate(delta){

    }

    render(){

        if(!this.started) return;

        this.graphics.render();

    }

    changeState(state){

        if(this.state===state) return;

        this.state=state;

        this.core.events.emit(

            "stateChanged",

            state

        );

    }

    onResize(){

        this.graphics?.resize();

    }

    dispose(){

        if(this.destroyed) return;

        this.destroyed=true;

        this.loop.stop();

        window.removeEventListener(

            "resize",

            this.onResize

        );

        this.graphics?.dispose();

        this.physics?.dispose();

        this.started=false;

    }

    getFPS(){

        return this.loop.getFPS();

    }

}
