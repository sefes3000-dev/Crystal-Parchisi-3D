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
    },

    bases: {
        RED: [],
        YELLOW: [],
        GREEN: [],
        BLUE: []
    }

};

function add(x, z) {

    BoardCoordinates.mainPath.push(
        new THREE.Vector3(
            x * TILE_SIZE,
            Y,
            z * TILE_SIZE
        )
    );

}

function home(color, x, z) {

    BoardCoordinates.homePaths[color].push(
        new THREE.Vector3(
            x * TILE_SIZE,
            Y,
            z * TILE_SIZE
        )
    );

}

function base(color, x, z) {

    BoardCoordinates.bases[color].push(
        new THREE.Vector3(
            x * TILE_SIZE,
            Y,
            z * TILE_SIZE
        )
    );

}

/*==========================
        MAIN PATH
==========================*/

add(-6,1);
add(-5,1);
add(-4,1);
add(-3,1);
add(-2,1);
add(-1,1);

add(-1,2);
add(-1,3);

add(-2,3);
add(-3,3);

add(-3,4);
add(-3,5);
add(-3,6);

add(-2,6);
add(-1,6);

add(0,6);

add(1,6);

add(1,5);

add(1,4);

add(1,3);
