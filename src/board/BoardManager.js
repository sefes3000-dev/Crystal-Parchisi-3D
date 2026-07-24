import * as THREE from "three";
import BoardData from "./BoardData.js";
import ModelLoader from "../graphics/ModelLoader.js";

export default class BoardManager {

    constructor(scene) {

        this.scene = scene;

        this.loader = new ModelLoader();

        this.board = null;

        this.tiles = [];

    }

    async init() {

        console.log("Initializing Board...");

        await this.loadBoard();

        this.createTiles();

        console.log("Board Ready.");

    }

    async loadBoard() {

        try {

            this.board = await this.loader.load("/models/board.glb");

            this.scene.add(this.board);

            console.log("Board Model Loaded");

        } catch (e) {

            console.warn("board.glb not found.");

            this.createFallbackBoard();

        }

    }

    createFallbackBoard() {

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

}
