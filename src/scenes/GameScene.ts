import { Scene, Math } from "phaser";


export default class GameScene extends Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('bg_layer_1', 'assets/PNG/Background/bg_layer1.png');
        this.load.image('grass', 'assets/PNG/Environment/ground_grass.png');
        // -- initalizing player

        this.load.image('bunny_stand', 'assets/PNG/Players/bunny1_stand.png');
    }

    create() {
        this.add.image(240, 320, 'bg_layer_1');
        // this.physics.add.image(240, 320, 'grass').setScale(0.5);
        const platforms = this.physics.add.staticGroup();

        for (let i = 0; i <= 5; i++) {
            const x = Math.Between(80, 380);
            const y = 150 * i;

            const platform = platforms.create(x, y, 'grass');
            platform.setScale(0.5);

            platform.body.updateFromGameObject();
        }

        const player = this.physics.add.sprite(240, 320, 'bunny_stand').setScale(0.5);
        this.physics.add.collider(platforms, player);
    }
}