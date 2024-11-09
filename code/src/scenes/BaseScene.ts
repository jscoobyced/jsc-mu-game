import Phaser from 'phaser'
import { GeneralSettings } from '../models/general'
import general from '../models/general.json'
import levelHelper from '../models/level'

export default class BaseScene extends Phaser.Scene {
  protected cursor!: Phaser.Types.Input.Keyboard.CursorKeys

  public constructor(level: number) {
    super(levelHelper.getLevelName(level))
  }

  protected doPreload = () => {
    if (this.input.keyboard)
      this.cursor = this.input.keyboard.createCursorKeys()
  }

  protected goToLevel = (level: number) => {
    this.scene.start(levelHelper.getLevelName(level))
  }

  protected getGeneralConfig = (): GeneralSettings => general

  protected playerCollidingWithWorld = () => {}
}
