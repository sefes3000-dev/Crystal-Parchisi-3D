export default class EngineLoop {
    constructor(engine) {
        this.engine = engine;

        this.running = false;
        this.paused = false;

        this.frameId = null;

        this.lastTime = 0;

        this.delta = 0;

        this.maxDelta = 0.05;

        this.fps = 0;

        this.frameCounter = 0;

        this.fpsTimer = 0;

        this.loop = this.loop.bind(this);
    }

    start() {
        if (this.running) return;

        this.running = true;
        this.paused = false;

        this.lastTime = performance.now();

        this.frameId = requestAnimationFrame(this.loop);
    }

    stop() {
        this.running = false;

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

        this.delta = (time - this.lastTime) / 1000;

        if (this.delta > this.maxDelta) {
            this.delta = this.maxDelta;
        }

        this.lastTime = time;

        if (!this.paused) {

            this.engine.update(this.delta);

            this.engine.render();

        }

        this.frameCounter++;

        this.fpsTimer += this.delta;

        if (this.fpsTimer >= 1) {

            this.fps = this.frameCounter;

            this.frameCounter = 0;

            this.fpsTimer = 0;

        }

        this.frameId = requestAnimationFrame(this.loop);
    }

    getFPS() {
        return this.fps;
    }
}
