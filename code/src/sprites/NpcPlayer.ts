import Phaser from 'phaser'
import { createIdleFrameSet } from '../common/frameSetManager'
import { Coordinates } from '../models/coordinates'
import getGeneralSettings, { GeneralSettings } from '../models/general'

let frameSetCreated = false

export default class NpcPlayer {
  private name!: string
  private player!: Phaser.Physics.Arcade.Sprite
  private playerDirection = 'idle'
  private general: GeneralSettings = getGeneralSettings()

  constructor(name: string) {
    this.name = name
    this.playerDirection = `${this.name}-idle`
  }

  preload = (scene: Phaser.Scene): void => {
    scene.load.atlas(
      this.name,
      `${this.general.baseUrls.images}/${this.name}.png`,
      `${this.general.baseUrls.json}/${this.name}.json`,
    )
  }

  create = (position: Coordinates, scene: Phaser.Scene): void => {
    this.player = scene.physics.add
      .sprite(position.x, position.y, this.name)
      .setBounce(0)
    this.createFrameSets(scene)
    this.player.play(this.playerDirection)
  }

  update = (time: number): void => {
    void time
  }

  private createFrameSets = (scene: Phaser.Scene) => {
    if (frameSetCreated) return
    scene.anims.create(createIdleFrameSet(this.name))
    frameSetCreated = true
  }
}
