import "./styles/main.css";

import ThreeManager from "./graphics/ThreeManager";

const app=document.getElementById("app");

app.innerHTML=`

<div id="game-container">

<canvas id="gameCanvas"></canvas>

</div>

`;

const canvas=document.getElementById("gameCanvas");

const engine=new ThreeManager(canvas);

engine.init();

function animate(){

    requestAnimationFrame(animate);

    engine.render();

}

animate();
