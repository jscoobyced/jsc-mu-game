import Phaser from 'phaser'
import config from './config'
import * as debug from './debug'
import IntroScene from './scenes/IntroScene'
import LevelOne from './scenes/levels/one/LevelOne'
import LevelTwo from './scenes/levels/one/LevelTwo'

new Phaser.Game(
  Object.assign(config, {
    scene: [IntroScene, LevelOne, LevelTwo],
  }),
)

void debug
