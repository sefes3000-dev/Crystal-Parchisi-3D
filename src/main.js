
// ============================================
// Crystal Parchisi 3D
// Main Entry Point
// Version: 0.1.0
// ============================================

import './styles/main.css';

console.log("==================================");
console.log(" Crystal Parchisi 3D ");
console.log(" Version 0.1.0 ");
console.log(" Engine Starting...");
console.log("==================================");

const app = document.getElementById("app");

if (!app) {
    throw new Error("App container not found.");
}

app.innerHTML = `
<div id="game-container">

    <canvas id="gameCanvas"></canvas>

</div>
`;

console.log("Game container created successfully.");
