import Phaser from 'phaser';
import config from './config';
import IntroScene from './scenes/IntroScene';
import LevelOne from './scenes/LevelOne';

new Phaser.Game(
  Object.assign(config, {
    scene: [IntroScene, LevelOne],
  }),
);
