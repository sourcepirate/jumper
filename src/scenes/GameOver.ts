import Phaser from "phaser";


export default class GameOver extends Phaser.Scene {

    constructor(){
        super('game-over');
    }


    create(){
        const width = this.scale.width * 0.5;
        const height = this.scale.height * 0.5;

        this.add.text(width, height, 'Game Over', {
            fontSize: 48
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', ()=> {
            this.scene.start('GameScene');
        });
    }

}