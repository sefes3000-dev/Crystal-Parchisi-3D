import * as THREE from "three";
import BoardData from "./BoardData.js";

export default class BoardManager {

    constructor(scene) {

        this.scene = scene;

        this.board = null;

        this.tiles = [];

    }

    async init() {

        console.log("Initializing Board...");

        this.createBoard();

        this.createTiles();

        console.log("Board Ready.");

    }

    createBoard() {

        const geometry = new THREE.BoxGeometry(

            10,
            0.5,
            10

        );

        const material = new THREE.MeshStandardMaterial({

            color: 0xffffff,

            roughness: 0.15,

            metalness: 0.25

        });

        this.board = new THREE.Mesh(

            geometry,

            material

        );

        this.board.receiveShadow = true;

        this.scene.add(this.board);

    }

    createTiles() {

        this.tiles = [];

        for (let i = 0; i < BoardData.MAIN_PATH_LENGTH; i++) {

            this.tiles.push({

                id: i,

                position: new THREE.Vector3()

            });

        }

    }

    getTile(index) {

        return this.tiles[index];

    }

    getBoard() {

        return this.board;

    }

}
