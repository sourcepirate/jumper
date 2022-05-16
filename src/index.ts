
import { Game } from 'phaser';
import config from './config';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/GameOver';

new Game(
    Object.assign(config, {
        scene: [GameScene, GameOver]
    })
)