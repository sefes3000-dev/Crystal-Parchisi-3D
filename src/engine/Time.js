export default class Time {

    constructor() {

        this.delta = 0;

        this.elapsed = 0;

        this.scale = 1;

        this.maxDelta = 0.05;

        this.fps = 0;

        this.frameCount = 0;

        this.frameTimer = 0;

    }

    update(delta) {

        if (delta > this.maxDelta) {

            delta = this.maxDelta;

        }

        this.delta = delta * this.scale;

        this.elapsed += this.delta;

        this.frameCount++;

        this.frameTimer += this.delta;

        if (this.frameTimer >= 1) {

            this.fps = this.frameCount;

            this.frameCount = 0;

            this.frameTimer = 0;

        }

    }

    setScale(value) {

        this.scale = Math.max(0, value);

    }

    reset() {

        this.delta = 0;

        this.elapsed = 0;

        this.frameCount = 0;

        this.frameTimer = 0;

        this.fps = 0;

    }

    getDelta() {

        return this.delta;

    }

    getElapsed() {

        return this.elapsed;

    }

    getFPS() {

        return this.fps;

    }

}
