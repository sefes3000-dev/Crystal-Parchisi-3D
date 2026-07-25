import * as THREE from "three";

export default class LightingManager {

    constructor(scene, renderer) {

        this.scene = scene;
        this.renderer = renderer;

        this.lights = [];

        this.shadowSize = 4096;

        this.sun = null;
        this.ambient = null;
        this.hemi = null;

    }

    init() {

        this.setupRenderer();

        this.createAmbient();

        this.createHemisphere();

        this.createSun();

        this.createCrystalLights();

    }

    setupRenderer() {

        this.renderer.physicallyCorrectLights = true;

        this.renderer.shadowMap.enabled = true;

        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

        this.renderer.toneMappingExposure = 1.15;

        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    }

    createAmbient() {

        this.ambient = new THREE.AmbientLight(

            0xffffff,

            0.6

        );

        this.scene.add(this.ambient);

    }

    createHemisphere() {

        this.hemi = new THREE.HemisphereLight(

            0xffffff,

            0x444466,

            0.8

        );

        this.scene.add(this.hemi);

    }

    createSun() {

        this.sun = new THREE.DirectionalLight(

            0xffffff,

            3

        );

        this.sun.position.set(

            15,

            25,

            12

        );

        this.sun.castShadow = true;

        this.sun.shadow.mapSize.set(

            this.shadowSize,

            this.shadowSize

        );

        this.sun.shadow.camera.left = -20;
        this.sun.shadow.camera.right = 20;
        this.sun.shadow.camera.top = 20;
        this.sun.shadow.camera.bottom = -20;
        this.sun.shadow.camera.near = 1;
        this.sun.shadow.camera.far = 80;

        this.scene.add(this.sun);

    }

    createCrystalLights() {

        const colors = [

            0xff4444,

            0xffdd00,

            0x33cc55,

            0x3399ff

        ];

        const positions = [

            [-5,2,5],

            [5,2,5],

            [5,2,-5],

            [-5,2,-5]

        ];

        for(let i=0;i<4;i++){

            const light = new THREE.PointLight(

                colors[i],

                10,

                8

            );

            light.position.set(

                positions[i][0],

                positions[i][1],

                positions[i][2]

            );

            this.scene.add(light);

            this.lights.push(light);

        }

    }

    setQuality(level){

        switch(level){

            case "LOW":

                this.sun.shadow.mapSize.set(1024,1024);

                break;

            case "MEDIUM":

                this.sun.shadow.mapSize.set(2048,2048);

                break;

            case "HIGH":

                this.sun.shadow.mapSize.set(4096,4096);

                break;

        }

    }

    update(delta){

        const t = performance.now()*0.001;

        this.lights.forEach((light,index)=>{

            light.intensity =

                8 +

                Math.sin(

                    t*2+index

                )*2;

        });

    }

    dispose(){

        this.scene.remove(this.sun);

        this.scene.remove(this.ambient);

        this.scene.remove(this.hemi);

        this.lights.forEach(light=>{

            this.scene.remove(light);

        });

        this.lights=[];

    }

}
