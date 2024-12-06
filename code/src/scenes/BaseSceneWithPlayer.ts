import { getCurrentStatus } from '../common/storage'
import { getLevelInfo } from '../models/level'
import BaseScene from './BaseScene'

export default class BaseSceneWithPlayer extends BaseScene {
  preload() {
    this.doPreload(true)
  }

  create() {
    const currentStatus = getCurrentStatus()
    let position = { x: 0, y: 0 }
    if (currentStatus) {
      position = currentStatus.player.position
    } else {
      const levelInfo = getLevelInfo(this.levelName)
      if (!levelInfo) return
      position = levelInfo.player.position
    }
    this.doCreate(position)
    this.collidePlayerWithWorld(this.collideWithWorld)
  }

  update = (time: number): void => {
    this.doUpdate(time)
  }

  private collideWithWorld = (data: Partial<Phaser.Physics.Arcade.Body>) => {
    void data
  }
}
