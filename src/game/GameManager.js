import BoardData from "../board/BoardData.js";

export default class GameManager {

    constructor(pieceManager, diceManager) {

        this.pieceManager = pieceManager;
        this.diceManager = diceManager;

        this.players = BoardData.PLAYERS;

        this.currentPlayer = 0;

        this.waitingDice = false;

        this.gameStarted = false;

        this.moveQueue = [];

        this.currentMovingPiece = null;

        this.extraTurn = false;

    }

    init() {

        console.log("Game Manager Ready");

        this.gameStarted = true;

    }

    getCurrentPlayer() {

        return this.players[this.currentPlayer];

    }

    rollDice() {

        if (this.waitingDice) return;

        if (this.moveQueue.length > 0) return;

        this.waitingDice = true;

        this.diceManager.roll();

    }

    update() {

        if (!this.gameStarted) return;

        if (this.waitingDice) {

            if (this.diceManager.isRolling) return;

            this.waitingDice = false;

            const value = this.diceManager.getValue();

            console.log(this.getCurrentPlayer(), "rolled", value);

            this.prepareMove(value);

        }

        this.updateMoveQueue();

    }

    prepareMove(steps) {

        const pieces = this.pieceManager.getPieces(
            this.getCurrentPlayer()
        );

        const piece = pieces.find(p => !p.finished);

        if (!piece) {

            this.nextTurn();

            return;

        }

        this.currentMovingPiece = piece;

        this.extraTurn = (steps === 6);

        if (piece.pathIndex === -1) {

            if (steps !== 6) {

                this.nextTurn();

                return;

            }

            piece.pathIndex = BoardData.START_INDEX[piece.player];

            this.moveQueue.push(piece.pathIndex);

            steps--;

        }

        for (let i = 0; i < steps; i++) {

            piece.pathIndex++;

            if (piece.pathIndex >= BoardData.MAIN_PATH_LENGTH) {

                piece.finished = true;

                break;

            }

            this.moveQueue.push(piece.pathIndex);

        }

    }

    updateMoveQueue() {

        if (!this.currentMovingPiece) return;

        if (this.pieceManager.isAnimating()) return;

        if (this.moveQueue.length === 0) {

            if (this.currentMovingPiece.finished) {

                console.log(
                    this.currentMovingPiece.player,
                    "finished a pawn"
                );

            }

            this.currentMovingPiece = null;

            if (!this.extraTurn) {

                this.nextTurn();

            }

            return;

        }

        const nextTile = this.moveQueue.shift();

        this.pieceManager.movePiece(

            this.currentMovingPiece,

            nextTile

        );

    }

    nextTurn() {

        this.currentPlayer++;

        if (this.currentPlayer >= this.players.length) {

            this.currentPlayer = 0;

        }

        console.log(
            "Current Player:",
            this.getCurrentPlayer()
        );

    }

}
