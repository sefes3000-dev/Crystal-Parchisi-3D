import * as THREE from "three";

export default class ThreeManager {

    constructor(canvas) {

        this.canvas = canvas;

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.clock = new THREE.Clock();

    }

    init() {

        this.createScene();

        this.createCamera();

        this.createRenderer();

        this.createLights();

        this.resize();

        window.addEventListener("resize", () => this.resize());

    }

    createScene() {

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0x1d1f27);

    }

    createCamera() {

        this.camera = new THREE.PerspectiveCamera(

            45,

            window.innerWidth / window.innerHeight,

            0.1,

            1000

        );

        this.camera.position.set(0,12,12);

        this.camera.lookAt(0,0,0);

    }

    createRenderer() {

        this.renderer = new THREE.WebGLRenderer({

            canvas:this.canvas,

            antialias:true,

            alpha:false

        });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.renderer.shadowMap.enabled=true;

    }

    createLights(){

        const ambient=new THREE.AmbientLight(0xffffff,1);

        this.scene.add(ambient);

        const dir=new THREE.DirectionalLight(0xffffff,2);

        dir.position.set(8,15,10);

        dir.castShadow=true;

        this.scene.add(dir);

    }

    resize(){

        this.camera.aspect=window.innerWidth/window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

    render(){

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

}
