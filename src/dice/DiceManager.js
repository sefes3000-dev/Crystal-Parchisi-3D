import * as THREE from "three";
import ModelLoader from "../graphics/ModelLoader.js";

export default class DiceManager {

    constructor(scene) {

        this.scene = scene;

        this.loader = new ModelLoader();

        this.dice = [];

        this.isRolling = false;

        this.values = [1, 1];

    }

    async init() {

        await this.createDice(0);

        await this.createDice(1);

        console.log("Dice System Ready");

    }

    async createDice(index) {

        let model;

        try {

            model = await this.loader.load("/models/dice.glb");

        } catch {

            model = new THREE.Mesh(

                new THREE.BoxGeometry(0.8,0.8,0.8),

                new THREE.MeshStandardMaterial({

                    color:0xffffff

                })

            );

        }

        model.position.set(

            index * 1.2 - 0.6,

            2,

            0

        );

        model.castShadow = true;

        this.scene.add(model);

        this.dice.push(model);

    }

    roll() {

        if(this.isRolling) return;

        this.isRolling = true;

        this.values[0] = Math.floor(Math.random()*6)+1;

        this.values[1] = Math.floor(Math.random()*6)+1;

        console.log("Dice:",this.values);

        // الفيزياء ستضاف لاحقًا

        setTimeout(()=>{

            this.isRolling=false;

        },1200);

    }

    getValues(){

        return this.values;

    }

}
