import Phaser from 'phaser';
import config from './config';
import IntroScene from './scenes/IntroScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [IntroScene],
  }),
);
