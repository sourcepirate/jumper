import { Scene, Math, Physics } from "phaser";


export default class GameScene extends Scene {

    private player?: Physics.Arcade.Sprite ;
    private platforms?: Physics.Arcade.StaticGroup;

    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('bg_layer_1', 'assets/PNG/Background/bg_layer1.png').setScrollFactor(1, 0);
        this.load.image('grass', 'assets/PNG/Environment/ground_grass.png');
        // -- initalizing player

        this.load.image('bunny_stand', 'assets/PNG/Players/bunny1_stand.png');
    }

    create() {
        this.add.image(240, 320, 'bg_layer_1');
        // this.physics.add.image(240, 320, 'grass').setScale(0.5);
        this.platforms = this.physics.add.staticGroup();

        for (let i = 0; i <= 5; i++) {
            const x = Math.Between(80, 380);
            const y = 150 * i;

            const platform = this.platforms.create(x, y, 'grass');
            platform.setScale(0.5);

            platform.body.updateFromGameObject();
        }

        this.player = this.physics.add.sprite(240, 320, 'bunny_stand').setScale(0.5);

        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;

        this.physics.add.collider(this.platforms, this.player);

        this.cameras.main.startFollow(this.player);
    }

    update(): void {

        this.platforms?.children.iterate(child => {
            const platform = child;
            const scrollY = this.cameras.main.scrollY;
            if(platform.y >= scrollY + 700) {
                platform.y = scrollY - Math.Between(50, 100);
                platform.body.updateFromGameObject();
            }
        })


        const isPlayerTouchingDown = this.player?.body.touching.down;
        if(isPlayerTouchingDown) {
            this.player?.setVelocityY(-300);
        }


    }
}