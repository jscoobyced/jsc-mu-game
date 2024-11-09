import BaseScene from './BaseScene'

export default class LevelOneScene extends BaseScene {
  constructor() {
    super(1)
  }

  preload() {
    this.doPreload(true)
  }

  create() {
    this.doCreate({ x: 50, y: 50 })
  }

  update = (time: number): void => {
    this.doUpdate(time)
  }
}
