import Phaser from 'phaser'
import config from './config'
import IntroScene from './scenes/IntroScene'
import LevelOne from './scenes/levels/one/LevelOne'
import LevelTwo from './scenes/levels/one/LevelTwo'

new Phaser.Game(
  Object.assign(config, {
    scene: [IntroScene, LevelOne, LevelTwo],
  }),
)
