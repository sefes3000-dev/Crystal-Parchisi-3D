import * as THREE from "three";
import BoardData from "../board/BoardData.js";
import PieceAnimator from "./PieceAnimator.js";

export default class PieceManager {

    constructor(scene, materials, boardManager) {

        this.scene = scene;
        this.materials = materials;
        this.boardManager = boardManager;

        this.animator = new PieceAnimator();

        this.pieces = [];

        this.colors = {
            RED: 0xff4444,
            YELLOW: 0xffdd33,
            GREEN: 0x33cc55,
            BLUE: 0x3399ff
        };

    }

    async init() {

        this.createPieces();

    }

    createPieces() {

        const radius = 0.22;
        const height = 0.45;

        const geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            height,
            32
        );

        BoardData.PLAYERS.forEach(player => {

            for (let i = 0; i < BoardData.PAWNS_PER_PLAYER; i++) {

                const material = new THREE.MeshPhysicalMaterial({

                    color: this.colors[player],

                    transmission: 0.25,

                    roughness: 0.18,

                    metalness: 0.12,

                    clearcoat: 1

                });

                const mesh = new THREE.Mesh(
                    geometry,
                    material
                );

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                this.scene.add(mesh);

                this.pieces.push({

                    player,

                    index: i,

                    pathIndex: -1,

                    mesh,

                    finished: false

                });

            }

        });

        this.resetPieces();

    }

    resetPieces() {

        const homes = {

            RED: [
                [-4.4,4.4],
                [-3.6,4.4],
                [-4.4,3.6],
                [-3.6,3.6]
            ],

            YELLOW: [
                [4.4,4.4],
                [3.6,4.4],
                [4.4,3.6],
                [3.6,3.6]
            ],

            GREEN: [
                [4.4,-4.4],
                [3.6,-4.4],
                [4.4,-3.6],
                [3.6,-3.6]
            ],

            BLUE: [
                [-4.4,-4.4],
                [-3.6,-4.4],
                [-4.4,-3.6],
                [-3.6,-3.6]
            ]

        };

        this.pieces.forEach(piece => {

            const p = homes[piece.player][piece.index];

            piece.mesh.position.set(
                p[0],
                0.55,
                p[1]
            );

            piece.mesh.rotation.set(0, 0, 0);

            piece.pathIndex = -1;

            piece.finished = false;

        });

    }

    movePiece(piece, pathIndex) {

        const tile = this.boardManager.getTile(pathIndex);

        if (!tile) return false;

        piece.pathIndex = pathIndex;

        const target = tile.position.clone();

        target.y = 0.55;

        this.animator.move(piece, target);

        return true;

    }

    getPieces(player) {

        return this.pieces.filter(

            p => p.player === player

        );

    }

    getPiece(player, index) {

        return this.pieces.find(

            p => p.player === player && p.index === index

        );

    }

    getAllPieces() {

        return this.pieces;

    }

    isAnimating() {

        return this.animator.isMoving();

    }

    update(delta) {

        this.animator.update(delta);

        this.pieces.forEach(piece => {

            piece.mesh.rotation.y += delta * 0.5;

        });

    }

    dispose() {

        this.animator = null;

        this.pieces.forEach(piece => {

            this.scene.remove(piece.mesh);

            piece.mesh.geometry.dispose();

            piece.mesh.material.dispose();

        });

        this.pieces = [];

    }

}
