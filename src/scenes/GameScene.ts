import { Scene, Math, Physics, Types, Tilemaps, GameObjects } from "phaser";
import { Carrot } from '../sprites/Carrot'


export default class GameScene extends Scene {

    private player?: Physics.Arcade.Sprite;
    private platforms?: Physics.Arcade.StaticGroup;
    private cursors?: Types.Input.Keyboard.CursorKeys;
    private carrots?: Physics.Arcade.Group;
    private carrotsCollected: number = 0;
    private carrotsCollectedText: any;

    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('bg_layer_1', 'assets/PNG/Background/bg_layer1.png');
        this.load.image('grass', 'assets/PNG/Environment/ground_grass.png');
        // -- initalizing player

        this.load.image('bunny_stand', 'assets/PNG/Players/bunny1_stand.png');
        this.load.image('carrot', 'assets/PNG/Items/carrot.png');
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.add.image(240, 320, 'bg_layer_1').setScrollFactor(1, 0);
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
        this.cameras.main.setDeadzone(this.scale.width * 1.5);

        this.carrots = this.physics.add.group({
            classType: Carrot
        });

        this.carrots.get(240, 320, 'carrot').setScale(0.5);
        this.physics.add.collider(this.platforms, this.carrots);
        this.physics.add.overlap(
            this.player,
            this.carrots,
            this.handleCollectCarrot, // called on overlap
            undefined,
            this
        );
        const style = { color: '#000', fontSize: 24 };
        this.carrotsCollectedText = this.add.text(240, 10, `Carrots: ${this.carrotsCollected}`, style).setScrollFactor(0).setOrigin(0.5, 0);
    }

    update(): void {

        this.platforms?.children.iterate(child => {
            const platform = child;
            const scrollY = this.cameras.main.scrollY;
            if (platform.y >= scrollY + 700) {
                platform.y = scrollY - Math.Between(50, 100);
                platform.body.updateFromGameObject();
                this.addAboveCarrot(platform);
            }
        })


        const isPlayerTouchingDown = this.player?.body.touching.down;
        if (isPlayerTouchingDown) {
            this.player?.setVelocityY(-300);
        }


        if (this.cursors?.left.isDown && !isPlayerTouchingDown) {
            this.player?.setVelocityX(-200);
        } else if (this.cursors?.right.isDown && !isPlayerTouchingDown) {
            this.player?.setVelocityX(200);
        } else {
            this.player?.setVelocityX(0);
        }

        this.horizontalWrap(this.player);

    }


    horizontalWrap(sprite: any) {
        const halfWidth = sprite.displayWidth * 0.5;
        const gameWidth = this.scale.width;

        if (sprite.x < -halfWidth) {
            sprite.x = gameWidth + halfWidth;
        } else if (sprite.x > gameWidth + halfWidth) {
            sprite.x = -halfWidth;
        }
    }


    addAboveCarrot(sprite: any) {
        const y = sprite.y - sprite.displayHeight;
        const carrot = this.carrots?.get(sprite.x, y, 'carrot').setScale(0.5);
        carrot.setActive(true);
        carrot.setVisible(true);
        this.add.existing(carrot);
        carrot.body.setSize(carrot.width, carrot.height);
        this.physics.world.enable(carrot);
        return carrot;
    }

    handleCollectCarrot(player: any, carrot: any) {
        this.carrots?.killAndHide(carrot);
        this.physics.world.disableBody(carrot.body);
        this.carrotsCollected += 1;
        this.carrotsCollectedText.text = `Carrots: ${this.carrotsCollected}`;
    }
}