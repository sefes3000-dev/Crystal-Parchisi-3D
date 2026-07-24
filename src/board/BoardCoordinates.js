import * as THREE from "three";

const TILE_SIZE = 0.68;
const Y = 0.26;

const BoardCoordinates = {

    mainPath: [],

    homePaths: {
        RED: [],
        YELLOW: [],
        GREEN: [],
        BLUE: []
    }

};

function add(x, z) {

    BoardCoordinates.mainPath.push(
        new THREE.Vector3(x * TILE_SIZE, Y, z * TILE_SIZE)
    );

}
