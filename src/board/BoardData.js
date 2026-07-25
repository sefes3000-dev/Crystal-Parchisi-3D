import * as THREE from "three";

const PATH = [];

const STEP = 0.66;

function add(x, z) {

    PATH.push(

        new THREE.Vector3(

            x * STEP,

            0,

            z * STEP

        )

    );

}

/*==========================
        RED START
==========================*/

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

/*==========================
      نحو الأصفر
==========================*/
