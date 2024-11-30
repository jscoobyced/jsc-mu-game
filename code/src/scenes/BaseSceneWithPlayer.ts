import BaseScene from './BaseScene'

export default class BaseSceneWithPlayer extends BaseScene {
  preload() {
    this.doPreload(true)
  }

  create() {
    this.doCreate({ x: 96, y: 32 })
    this.collidePlayerWithWorld(this.collideWithWorld)
  }

  update = (time: number): void => {
    this.doUpdate(time)
  }

  private collideWithWorld = (data: Partial<Phaser.Physics.Arcade.Body>) => {
    void data
  }
}
