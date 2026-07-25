export default class EngineLoop {

    constructor(engine) {

        this.engine = engine;

        this.running = false;

        this.paused = false;

        this.frameId = null;

        this.lastTime = 0;

        this.delta = 0;

        this.maxDelta = 0.05;

        this.targetFPS = 60;

        this.frameDuration = 1000 / this.targetFPS;

        this.accumulator = 0;

        this.fps = 0;

        this.frameCounter = 0;

        this.fpsTimer = 0;

        this.loop = this.loop.bind(this);

        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    this.pause();

                } else {

                    this.resume();

                }

            }

        );

    }

    start() {

        if (this.running) return;

        this.running = true;

        this.paused = false;

        this.lastTime = performance.now();

        this.accumulator = 0;

        this.frameId = requestAnimationFrame(this.loop);

    }

    stop() {

        this.running = false;

        this.paused = false;

        if (this.frameId !== null) {

            cancelAnimationFrame(this.frameId);

            this.frameId = null;

        }

    }

    pause() {

        this.paused = true;

    }

    resume() {

        if (!this.running) return;

        this.paused = false;

        this.lastTime = performance.now();

    }

    loop(time) {

        if (!this.running) return;

        let elapsed = time - this.lastTime;

        this.lastTime = time;

        if (elapsed > 250) {

            elapsed = this.frameDuration;

        }

        this.accumulator += elapsed;

        while (this.accumulator >= this.frameDuration) {

            this.delta = this.frameDuration / 1000;

            if (this.delta > this.maxDelta) {

                this.delta = this.maxDelta;

            }

            if (!this.paused) {

                if (this.engine.beforeUpdate) {

                    this.engine.beforeUpdate(this.delta);

                }

                this.engine.update(this.delta);

                if (this.engine.afterUpdate) {

                    this.engine.afterUpdate(this.delta);

                }

            }

            this.accumulator -= this.frameDuration;

        }

        if (!this.paused) {

            this.engine.render();

        }

        this.frameCounter++;

        this.fpsTimer += elapsed / 1000;

        if (this.fpsTimer >= 1) {

            this.fps = this.frameCounter;

            this.frameCounter = 0;

            this.fpsTimer = 0;

        }

        this.frameId = requestAnimationFrame(this.loop);

    }

    setFPS(fps) {

        this.targetFPS = fps;

        this.frameDuration = 1000 / fps;

    }

    getFPS() {

        return this.fps;

    }

    isRunning() {

        return this.running;

    }

}
