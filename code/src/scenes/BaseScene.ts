import Phaser from 'phaser'
import Controller from '../common/controller'
import { isMobile } from '../common/deviceHelper'
import { GeneralSettings } from '../models/general'
import general from '../models/general.json'
import levelHelper from '../models/level'
import { PlayerPosition } from '../models/position'
import Player from '../sprites/Player'

export default class BaseScene extends Phaser.Scene {
  private player?: Player
  protected cursor!: Phaser.Types.Input.Keyboard.CursorKeys

  public constructor(level: number) {
    super(levelHelper.getLevelName(level))
  }

  /**
   * Preload the necessary assets
   * @param withPlayer Indicates if need to include the default Player
   */
  protected doPreload = (withPlayer = false) => {
    if (this.input.keyboard)
      this.cursor = this.input.keyboard.createCursorKeys()
    if (withPlayer) {
      this.player = new Player()
      this.player.preload(this)
    }
  }

  /**
   * Create the content of the canvas
   * @param playerPosition The position to place the player
   */
  protected doCreate = (playerPosition: PlayerPosition = { x: 0, y: 0 }) => {
    if (this.player) {
      this.player.create(
        playerPosition,
        this,
        this.cursor,
        isMobile(this.game) ? new Controller(this) : undefined,
      )
    }
  }

  /**
   * Delegates the updates to all sprites
   * @param time The update time
   */
  protected doUpdate = (time: number) => {
    this.player?.update(time)
  }

  /**
   * Go to a new scene of type Level
   * @param level The level to go to
   */
  protected goToLevel = (level: number) => {
    this.scene.start(levelHelper.getLevelName(level))
  }

  /**
   * Simple accessor to the general configuration of the game
   * @returns the general configuration of the game
   */
  protected getGeneralConfig = (): GeneralSettings => general

  /**
   * Simple accessor to the Player object
   * @returns The Player object
   */
  protected getPlayer = () => this.player

  /**
   * Allows to specify a collision function when the Player collids with boundaries of the world
   * @param collisionFunction
   */
  protected collidePlayerWithWorld = (collisionFunction: Function) => {
    if (this.player) {
      const sprite = this.player.getSprite()
      if (sprite.body) sprite.body.world.on('worldbounds', collisionFunction)
    }
  }
}
