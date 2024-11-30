import { getLevelInfo } from '../models/level'
import BaseScene from './BaseScene'

export default class BaseSceneWithPlayer extends BaseScene {
  preload() {
    this.doPreload(true)
  }

  create() {
    const levelInfo = getLevelInfo(this.levelName)
    if (!levelInfo) return
    this.doCreate(levelInfo.player.position)
    this.collidePlayerWithWorld(this.collideWithWorld)
  }

  update = (time: number): void => {
    this.doUpdate(time)
  }

  private collideWithWorld = (data: Partial<Phaser.Physics.Arcade.Body>) => {
    void data
  }
}
