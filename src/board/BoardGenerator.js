import * as THREE from "three";

export default class BoardGenerator {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();

        this.tileSize = 0.65;

        this.tileHeight = 0.12;

    }

    build() {

        this.createBase();

        this.createCenter();

        this.createHomeAreas();

        return this.group;

    }

    createBase() {

        const board = new THREE.Mesh(

            new THREE.BoxGeometry(12,0.4,12),

            this.materials.get("glass")

        );

        board.receiveShadow = true;

        board.castShadow = true;

        this.group.add(board);

    }

    createCenter() {

        const center = new THREE.Mesh(

            new THREE.CylinderGeometry(1.2,1.2,0.15,64),

            this.materials.get("gold")

        );

        center.position.y = 0.28;

        center.receiveShadow = true;

        center.castShadow = true;

        this.group.add(center);

    }

    createHomeAreas() {

        this.createCorner(-3.8,3.8,0xff4444);

        this.createCorner(3.8,3.8,0xffdd33);

        this.createCorner(3.8,-3.8,0x44cc44);

        this.createCorner(-3.8,-3.8,0x3399ff);

    }

    createCorner(x,z,color){

        const mesh=new THREE.Mesh(

            new THREE.BoxGeometry(2.6,0.1,2.6),

            new THREE.MeshStandardMaterial({

                color,

                roughness:0.3,

                metalness:0.15

            })

        );

        mesh.position.set(x,0.26,z);

        mesh.receiveShadow=true;

        mesh.castShadow=true;

        this.group.add(mesh);

    }

}
