import * as THREE from "three";

export default class DiceValueReader {

    static getValue(mesh) {

        const up = new THREE.Vector3(0,1,0);

        const directions = [

            { value:1, dir:new THREE.Vector3(0,1,0) },

            { value:6, dir:new THREE.Vector3(0,-1,0) },

            { value:2, dir:new THREE.Vector3(0,0,1) },

            { value:5, dir:new THREE.Vector3(0,0,-1) },

            { value:3, dir:new THREE.Vector3(1,0,0) },

            { value:4, dir:new THREE.Vector3(-1,0,0) }

        ];

        let best = 1;

        let maxDot = -999;

        directions.forEach(face=>{

            const world = face.dir.clone();

            world.applyQuaternion(mesh.quaternion);

            const dot = world.dot(up);

            if(dot>maxDot){

                maxDot = dot;

                best = face.value;

            }

        });

        return best;

    }

}
