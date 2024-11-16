import { createMap, getObstacleLayer, loadMapImage } from '../common/mapManager'
import BaseScene from './BaseScene'

export default class LevelOneScene extends BaseScene {
  private LEVEL = 'one'

  constructor() {
    super(1)
  }

  preload() {
    this.doPreload(true)
    loadMapImage(this.LEVEL, 1, 1, this)
  }

  create() {
    const map = createMap(this.LEVEL, 1, 1, this)
    this.doCreate({ x: 96, y: 32 })
    const player = this.getPlayer()?.getSprite()
    if (player) {
      const obstacleLayer = getObstacleLayer(map)
      if (obstacleLayer) this.physics.add.collider(player, obstacleLayer)
    }
  }

  update = (time: number): void => {
    this.doUpdate(time)
  }
}
