import Phaser from 'phaser'
import Controller from '../common/controller'
import { GeneralSettings } from '../models/general'
import general from '../models/general.json'
import levelHelper from '../models/level'
import Player from '../sprites/Player'

export default class BaseScene extends Phaser.Scene {
  private player?: Player
  protected cursor!: Phaser.Types.Input.Keyboard.CursorKeys

  public constructor(level: number) {
    super(levelHelper.getLevelName(level))
  }

  protected doPreload = (withPlayer: boolean = false) => {
    if (this.input.keyboard)
      this.cursor = this.input.keyboard.createCursorKeys()
    if (withPlayer) {
      this.player = new Player()
      this.player.preload(this)
    }
  }

  protected doCreate = (position: { x: number; y: number }) => {
    if (this.player) {
      this.player.create(
        position.x,
        position.y,
        this,
        this.cursor,
        this.isMobile() ? new Controller(this.scene.scene) : undefined,
      )
      const sprite = this.player.getSprite()
      if (sprite.body)
        sprite.body.world.on('worldbounds', this.playerCollidingWithWorld)
    }
  }

  protected doUpdate = (time: number) => {
    this.player?.update(time)
  }

  protected goToLevel = (level: number) => {
    this.scene.start(levelHelper.getLevelName(level))
  }

  protected getGeneralConfig = (): GeneralSettings => general

  protected isMobile = () =>
    this.game.device.os.android ||
    this.game.device.os.iPad ||
    this.game.device.os.iPhone

  protected getPlayer = () => this.player

  private playerCollidingWithWorld = () => {
    // In case want to have high level event.
  }
}
