import { getCurrentStatus } from '../common/storage'
import { getLevelInfo } from '../models/level'
import BaseScene from './BaseScene'

export default class BaseSceneWithPlayer extends BaseScene {
  protected basePreload = () => {
    this.doPreload(true)
  }

  protected baseCreate = async () => {
    let position = { x: 0, y: 0 }
    const currentStatusData = await getCurrentStatus()
    if (
      currentStatusData &&
      currentStatusData.player.position.x != -1 &&
      currentStatusData.levelData.levelName === this.levelName
    ) {
      position = currentStatusData.player.position
    } else {
      const levelInfo = getLevelInfo(this.levelName)
      if (!levelInfo) return
      position = levelInfo.player.position
    }
    this.doCreate(position)
    this.collidePlayerWithWorld(this.collideWithWorld)
  }

  protected baseUpdate = (time: number): void => {
    if (this.isCollided) this.getPlayer()?.setIdle()
    else this.doUpdate(time)
  }

  private collideWithWorld = (data: Partial<Phaser.Physics.Arcade.Body>) => {
    void data
  }
}
