import Phaser from 'phaser'
import {
  createIdleFrameSet,
  createSleepingFrameSet,
} from '../common/frameSetManager'
import { Coordinates } from '../models/coordinates'
import getGeneralSettings, { GeneralSettings } from '../models/general'
import { Interaction } from '../models/level'

export default class NpcPlayer {
  private frameSetCreated = false

  private name!: string
  private interactions!: Interaction[]
  private player!: Phaser.Physics.Arcade.Sprite
  private playerDirection = 'idle'
  private initialPosition!: Coordinates
  private general: GeneralSettings = getGeneralSettings()

  constructor(
    name: string,
    initialPosition: Coordinates,
    interactions: Interaction[],
  ) {
    this.name = name
    this.initialPosition = initialPosition
    this.interactions = interactions
    this.playerDirection = `${this.name}-idle`
  }

  preload = (scene: Phaser.Scene): void => {
    scene.load.atlas(
      this.name,
      `${this.general.baseUrls.images}/${this.name}.png`,
      `${this.general.baseUrls.json}/${this.name}.json`,
    )
  }

  create = (scene: Phaser.Scene): void => {
    this.player = scene.physics.add
      .sprite(this.initialPosition.x, this.initialPosition.y, this.name)
      .setBounce(0)
      .setVelocity(0, 0)
      .setImmovable()
      .setName(this.name)
    this.createFrameSets(scene)
    this.player.play(this.playerDirection)
  }

  update = (time: number): void => {
    void time
  }

  public getSprite = () => this.player

  public getName = () => this.name

  public getInteractions = () => this.interactions

  public setAnimation = (isSleeping: boolean) => {
    if (isSleeping) this.player.play(`${this.name}-sleep`)
    else this.player.play(`${this.name}-idle`)
  }

  private createFrameSets = (scene: Phaser.Scene) => {
    if (this.frameSetCreated) return
    scene.anims.create(createIdleFrameSet(this.name))
    scene.anims.create(createSleepingFrameSet(this.name))
    this.frameSetCreated = true
  }
}
