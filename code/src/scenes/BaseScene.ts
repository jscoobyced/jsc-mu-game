import Phaser from 'phaser'
import Controller from '../common/controller'
import { isMobile } from '../common/deviceHelper'
import { createMap, getObstacleLayer, loadMapImage } from '../common/mapManager'
import { saveCurrentStatus } from '../common/storage'
import { Coordinates } from '../models/coordinates'
import { GeneralSettings } from '../models/general'
import general from '../models/general.json'
import { CurrentStatusData } from '../models/saved'
import Player from '../sprites/Player'

const SAVE_PERIOD = 10000

export default class BaseScene extends Phaser.Scene {
  private player?: Player
  private lastSaved = 0
  protected cursor!: Phaser.Types.Input.Keyboard.CursorKeys
  protected levelName!: string

  public constructor(levelName: string) {
    super(levelName)
    this.levelName = levelName
  }

  /**
   * Preload the necessary assets
   * @param withPlayer Indicates if need to include the default Player
   * @param playerName Indicates the name of the player, used to load assets
   */
  protected doPreload = (withPlayer = false, playerName = 'mumu') => {
    if (this.input.keyboard)
      this.cursor = this.input.keyboard.createCursorKeys()
    if (withPlayer) {
      this.player = new Player(playerName)
      this.player.preload(this)
    }
    loadMapImage(this.levelName, this)
  }

  /**
   * Create the content of the canvas
   * @param playerPosition The position to place the player
   */
  protected doCreate = (playerPosition: Coordinates) => {
    const map = createMap(this.levelName, this)
    if (!map) return
    if (this.player) {
      this.player.create(
        playerPosition,
        this,
        this.cursor,
        isMobile(this.game) ? new Controller(this) : undefined,
      )
    }
    const playerSprite = this.player?.getSprite()
    if (playerSprite) {
      const obstacleLayer = getObstacleLayer(map)
      if (obstacleLayer) this.physics.add.collider(playerSprite, obstacleLayer)
      this.cameras.main.startFollow(playerSprite)
    }
  }

  /**
   * Delegates the updates to all sprites
   * @param time The update time
   */
  protected doUpdate = (time: number) => {
    this.player?.update(time)
    if (time - this.lastSaved > SAVE_PERIOD) {
      this.lastSaved = time
      const playerSprite = this.player?.getSprite()
      if (playerSprite) {
        const currentStatus: CurrentStatusData = {
          levelName: this.levelName,
          player: {
            position: {
              x: playerSprite.x,
              y: playerSprite.y,
            },
          },
        }
        void (async () => {
          await saveCurrentStatus(currentStatus)
        })()
      }
    }
  }

  /**
   * Go to a new scene of type Level
   * @param level The level to go to
   */
  protected goToLevel = (levelName: string) => {
    this.scene.start(levelName)
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
  protected collidePlayerWithWorld = (
    collisionFunction: (data: Partial<Phaser.Physics.Arcade.Body>) => void,
  ) => {
    if (this.player) {
      const sprite = this.player.getSprite()
      if (sprite.body) sprite.body.world.on('worldbounds', collisionFunction)
    }
  }
}
