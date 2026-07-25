import BoardData from "../board/BoardData.js";

export default class GameManager {

    constructor(pieceManager, diceManager) {

        this.pieceManager = pieceManager;
        this.diceManager = diceManager;

        this.players = BoardData.PLAYERS;

        this.currentPlayer = 0;

        this.selectedPiece = null;

        this.waitingDice = false;

        this.gameStarted = false;

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

        this.waitingDice = true;

        this.diceManager.roll();

    }

    update() {

        if (!this.waitingDice) return;

        if (this.diceManager.isRolling) return;

        this.waitingDice = false;

        const value = this.diceManager.getValue();

        console.log(

            this.getCurrentPlayer(),

            "rolled",

            value

        );

        this.autoMove(value);

    }

    autoMove(steps) {

        const pieces =

            this.pieceManager.getPieces(

                this.getCurrentPlayer()

            );

        let piece =

            pieces.find(

                p => !p.finished

            );

        if (!piece) {

            this.nextTurn();

            return;

        }

        if (piece.pathIndex === -1) {

            if (steps !== 6) {

                this.nextTurn();

                return;

            }

            piece.pathIndex =

                BoardData.START_INDEX[

                    piece.player

                ];

        }

        else {

            piece.pathIndex += steps;

        }

        if (

            piece.pathIndex >=

            BoardData.MAIN_PATH_LENGTH

        ) {

            piece.finished = true;

            console.log(

                piece.player,

                "piece finished"

            );

        }

        else {

            this.pieceManager.movePiece(

                piece,

                piece.pathIndex

            );

        }

        if (steps !== 6) {

            this.nextTurn();

        }

    }

    nextTurn() {

        this.currentPlayer++;

        if (

            this.currentPlayer >=

            this.players.length

        ) {

            this.currentPlayer = 0;

        }

        console.log(

            "Current Player:",

            this.getCurrentPlayer()

        );

    }

}
