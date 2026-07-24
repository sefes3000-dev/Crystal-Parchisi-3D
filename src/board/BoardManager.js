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

        const geometry = new THREE.BoxGeometry(10,0.5,10);

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

        const radius = 4.25;

        for(let i=0;i<BoardData.MAIN_PATH_LENGTH;i++){

            const angle =

                (i / BoardData.MAIN_PATH_LENGTH)

                * Math.PI * 2;

            const position = new THREE.Vector3(

                Math.cos(angle) * radius,

                0.26,

                Math.sin(angle) * radius

            );

            const tile={

                id:i,

                occupied:false,

                piece:null,

                position

            };

            this.tiles.push(tile);

            if(this.showDebugTiles){

                const mesh=new THREE.Mesh(

                    new THREE.BoxGeometry(.18,.05,.18),

                    new THREE.MeshBasicMaterial({

                        color:0x00ff00

                    })

                );

                mesh.position.copy(position);

                this.tileGroup.add(mesh);

            }

        }

    }

    getTile(index){

        return this.tiles[index] ?? null;

    }

    getTilePosition(index){

        const tile=this.getTile(index);

        return tile ? tile.position.clone() : null;

    }

    occupy(index,piece){

        const tile=this.getTile(index);

        if(!tile) return false;

        tile.occupied=true;

        tile.piece=piece;

        return true;

    }

    free(index){

        const tile=this.getTile(index);

        if(!tile) return;

        tile.occupied=false;

        tile.piece=null;

    }

    clear(){

        this.tiles=[];

        this.tileGroup.clear();

    }

    dispose(){

        this.clear();

        if(this.board){

            this.scene.remove(this.board);

        }

    }

}
