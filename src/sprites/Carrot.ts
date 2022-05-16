import { GameObjects } from "phaser";


export default class Carrot extends GameObjects.Sprite {

    constructor(scene: any, x: any, y: any, texture: any){
        super(scene, x, y, texture);
        this.setScale(0.5);
    }
}