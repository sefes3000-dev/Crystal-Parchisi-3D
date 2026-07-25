import * as THREE from "three";

const STEP = 0.65;

const PATH = [];

function add(x, z) {

    PATH.push(
        new THREE.Vector3(
            x * STEP,
            0,
            z * STEP
        )
    );

}

/*==================================================
    MAIN PATH
==================================================*/

// RED START

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

add(-2,5);

add(-1,5);

add(0,5);

add(1,5);

add(1,4);

add(1,3);

add(2,3);

add(3,3);

add(3,2);

add(3,1);

add(4,1);

add(5,1);

add(6,1);

add(6,0);

add(6,-1);

add(5,-1);

add(4,-1);

add(3,-1);

add(3,-2);

add(3,-3);

add(2,-3);

add(1,-3);

add(1,-4);

add(1,-5);

add(1,-6);

add(0,-6);

add(-1,-6);

add(-1,-5);

add(-1,-4);

add(-1,-3);

add(-2,-3);

add(-3,-3);

add(-3,-2);

add(-3,-1);

add(-4,-1);

add(-5,-1);

add(-6,-1);

add(-6,0);

add(-6,1);

add(-6,2);

add(-6,3);

add(-5,3);

add(-4,3);

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

add(2,3);

add(3,3);

add(3,2);

add(3,1);
