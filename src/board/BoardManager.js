import * as THREE from "three";
import BoardData from "./BoardData.js";
import ModelLoader from "../graphics/ModelLoader.js";

export default class BoardManager {

    constructor(scene) {

        this.scene = scene;

        this.loader = new ModelLoader();

        this.board = null;

        this.tiles = [];

        this.tileGroup = new THREE.Group();

        this.showDebugTiles = false;

        this.tileSize = 0.55;

        this.tileHeight = 0.26;

        this.occupiedTiles = new Map();

    }

    async init() {

        console.log("Initializing Board...");

        await this.loadBoard();

        this.createTiles();

        this.scene.add(this.tileGroup);

        console.log("Board Ready.");

    }

    async loadBoard() {

        try {

            this.board = await this.loader.load("/models/board.glb");

            this.board.traverse(child => {

                if (child.isMesh) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                }

            });

            this.scene.add(this.board);

            console.log("Board Model Loaded");

        }

        catch {

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

            color:0xffffff,

            roughness:0.15,

            metalness:0.25

        });

        this.board = new THREE.Mesh(

            geometry,

            material

        );

        this.board.castShadow = true;

        this.board.receiveShadow = true;

        this.scene.add(this.board);

    }

    createTiles() {

        this.tiles = [];

        this.tileGroup.clear();

        // إذا كانت الإحداثيات موجودة في BoardData استخدمها
        if (BoardData.PATH && BoardData.PATH.length > 0) {

            for (let i = 0; i < BoardData.PATH.length; i++) {

                const position = BoardData.PATH[i].clone();

                position.y = this.tileHeight;

                const tile = {

                    id: i,

                    position,

                    occupied: false,

                    piece: null,

                    safe: BoardData.SAFE_TILES.includes(i)

                };

                this.tiles.push(tile);

                this.createDebugTile(tile);

            }

            return;

        }

        // مؤقتاً حتى ننتهي من BoardData
        const radius = 4.25;

        for (let i = 0; i < BoardData.MAIN_PATH_LENGTH; i++) {

            const angle =

                (i / BoardData.MAIN_PATH_LENGTH) *

                Math.PI * 2;

            const position = new THREE.Vector3(

                Math.cos(angle) * radius,

                this.tileHeight,

                Math.sin(angle) * radius

            );

            const tile = {

                id: i,

                position,

                occupied: false,

                piece: null,

                safe: BoardData.SAFE_TILES.includes(i)

            };

            this.tiles.push(tile);

            this.createDebugTile(tile);

        }

    }

    createDebugTile(tile) {

        if (!this.showDebugTiles) return;

        const mesh = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.tileSize,

                0.05,

                this.tileSize

            ),

            new THREE.MeshBasicMaterial({

                color: tile.safe

                    ? 0xffff00

                    : 0x00ff00

            })

        );

        mesh.position.copy(tile.position);

        this.tileGroup.add(mesh);

    }

    getTile(index) {

        if (index < 0) return null;

        if (index >= this.tiles.length) return null;

        return this.tiles[index];

    }

    getTilePosition(index) {

        const tile = this.getTile(index);

        return tile ? tile.position.clone() : null;

    }

    isSafeTile(index) {

        return BoardData.SAFE_TILES.includes(index);

    }

    isOccupied(index) {

        return this.occupiedTiles.has(index);

    }

    getPiece(index) {

        return this.occupiedTiles.get(index) ?? null;

    }

    occupy(index, piece) {

        const tile = this.getTile(index);

        if (!tile) return false;

        tile.occupied = true;

        tile.piece = piece;

        this.occupiedTiles.set(index, piece);

        return true;

    }

    free(index) {

        const tile = this.getTile(index);

        if (!tile) return;

        tile.occupied = false;

        tile.piece = null;

        this.occupiedTiles.delete(index);

    }

    update() {

    }

    clear() {

        this.tiles = [];

        this.occupiedTiles.clear();

        this.tileGroup.clear();

    }
