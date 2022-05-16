
import { Game } from 'phaser';
import config from './config';
import GameScene from './scenes/GameScene';

new Game(
    Object.assign(config, {
        scene: [GameScene]
    })
)