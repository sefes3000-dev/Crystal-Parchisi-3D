import * as THREE from "three";

export default class BoardGenerator {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();

        this.tileSize = 0.65;
        this.tileHeight = 0.10;

        this.mainTiles = [];
        this.homeTiles = [];

    }

    build() {

        this.createBase();

        this.createBorder();

        this.createCenter();

        this.createHomeAreas();

        this.createMainPath();

        this.createHomePaths();

        this.createSafeTiles();

        return this.group;

    }

    createBase() {

        const board = new THREE.Mesh(

            new THREE.BoxGeometry(
                12,
                0.40,
                12
            ),

            this.materials.get("glass")

        );

        board.castShadow = true;

        board.receiveShadow = true;

        this.group.add(board);

    }

    createBorder() {

        const border = new THREE.Mesh(

            new THREE.BoxGeometry(
                12.3,
                0.15,
                12.3
            ),

            this.materials.get("gold")

        );

        border.position.y = 0.28;

        border.castShadow = true;

        border.receiveShadow = true;

        this.group.add(border);

    }

    createCenter() {

        const center = new THREE.Mesh(

            new THREE.CylinderGeometry(
                1.25,
                1.25,
                0.16,
                64
            ),

            this.materials.get("gold")

        );

        center.position.y = 0.31;

        center.castShadow = true;

        center.receiveShadow = true;

        this.group.add(center);

    }

    createTile(x,z,color=0xffffff){

        const tile=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.tileSize,

                this.tileHeight,

                this.tileSize

            ),

            new THREE.MeshStandardMaterial({

                color,

                roughness:0.35,

                metalness:0.20

            })

        );

        tile.position.set(

            x,

            0.35,

            z

        );

        tile.castShadow=true;

        tile.receiveShadow=true;

        this.group.add(tile);

        this.mainTiles.push(tile);

        return tile;

    }

    createColoredTile(x,z,color){

        const tile=this.createTile(

            x,

            z,

            color

        );

        tile.material.emissive=

            new THREE.Color(color);

        tile.material.emissiveIntensity=

            0.15;

    }

    createHomeAreas(){

        this.createHome(

            -3.8,

            3.8,

            0xff4444

        );

        this.createHome(

            3.8,

            3.8,

            0xffdd33

        );

        this.createHome(

            3.8,

            -3.8,

            0x33cc55

        );

        this.createHome(

            -3.8,

            -3.8,

            0x3399ff

        );

    }

    createHome(x,z,color){

        const base=new THREE.Mesh(

            new THREE.BoxGeometry(

                2.8,

                0.12,

                2.8

            ),

            new THREE.MeshStandardMaterial({

                color,

                roughness:0.30,

                metalness:0.10

            })

        );

        base.position.set(

            x,

            0.28,

            z

        );

        base.castShadow=true;

        base.receiveShadow=true;

        this.group.add(base);

    }

    createMainPath() {

        const s = this.tileSize;

        const path = [

            [-5,1],[-4,1],[-3,1],[-2,1],[-1,1],
            [-1,2],[-1,3],[-2,3],[-3,3],[-3,4],
            [-3,5],[-2,5],[-1,5],[0,5],[1,5],
            [1,4],[1,3],

            [2,3],[3,3],[3,2],[3,1],[4,1],[5,1],
            [5,0],[5,-1],[4,-1],[3,-1],[3,-2],
            [3,-3],[2,-3],[1,-3],[1,-4],[1,-5],

            [0,-5],[-1,-5],[-1,-4],[-1,-3],
            [-2,-3],[-3,-3],[-3,-2],[-3,-1],
            [-4,-1],[-5,-1],[-5,0],

            [-4,0],[-3,0],[-2,0],[-1,0],
            [0,0],[1,0],[2,0],[3,0],[4,0],

            [4,2],[4,3],[4,4],
            [2,4],[0,4],[-2,4],[-4,4],

            [-4,2],[-4,-2],[0,-4],[4,-4]

        ];

        path.forEach((p,index)=>{

            let color = 0xffffff;

            if([0,17,34,51].includes(index))
                color = 0xffd700;

            if([8,13,21,26,39,47].includes(index))
                color = 0x55ff55;

            this.createTile(

                p[0]*s,

                p[1]*s,

                color

            );

        });

    }

    createHomePaths() {

        const s = this.tileSize;

        const colors = {

            RED:0xff4444,
            YELLOW:0xffdd33,
            GREEN:0x33cc55,
            BLUE:0x3399ff

        };

        for(let i=0;i<6;i++){

            this.createColoredTile(

                0,

                (4-i)*s,

                colors.RED

            );

            this.createColoredTile(

                (4-i)*s,

                0,

                colors.YELLOW

            );

            this.createColoredTile(

                0,

                (-4+i)*s,

                colors.GREEN

            );

            this.createColoredTile(

                (-4+i)*s,

                0,

                colors.BLUE

            );

        }

    }

    createSafeTiles() {

        const safeGeometry = new THREE.CylinderGeometry(

            0.12,

            0.12,

            0.08,

            20

        );

        const safeMaterial = new THREE.MeshStandardMaterial({

            color:0xffd700,

            emissive:0xffcc00,

            emissiveIntensity:1

        });

        const safeIndexes=[

            0,8,13,21,26,34,39,47

        ];

        safeIndexes.forEach(index=>{

            const tile=this.mainTiles[index];

            if(!tile) return;

            const marker=new THREE.Mesh(

                safeGeometry,

                safeMaterial

            );

            marker.position.copy(

                tile.position

            );

            marker.position.y+=0.12;

            this.group.add(marker);

        });

    }
