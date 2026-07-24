import "./styles/main.css";

import GameEngine from "./engine/GameEngine.js";

const app = document.getElementById("app");

app.innerHTML = `
<div id="game-container">
    <canvas id="gameCanvas"></canvas>
</div>
`;

const canvas = document.getElementById("gameCanvas");

const game = new GameEngine(canvas);

await game.init();

function loop() {

    requestAnimationFrame(loop);

    game.update();

    game.render();

}

loop();
