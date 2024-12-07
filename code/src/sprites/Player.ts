import Phaser from 'phaser'
import Controller from '../common/controller'
import {
  createIdleFrameSet,
  createMovingFrameSets,
} from '../common/frameSetManager'
import { Coordinates } from '../models/coordinates'
import { SPRITE_VELOCITY_RUN_FACTOR } from '../models/frameSet'
import getGeneralSettings, { GeneralSettings } from '../models/general'

let frameSetCreated = false

export default class Player {
  private name!: string
  private player!: Phaser.Physics.Arcade.Sprite
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
  private controller?: Controller
  private PLAYER_VELOCITY_WALK = 200
  private PLAYER_WALK_TO_RUN_TIME_IN_MS = 500
  private playerDirection = 'idle'
  private pointerRight = false
  private pointerLeft = false
  private pointerUp = false
  private pointerDown = false
  private walkTime = 0
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

  create = (
    position: Coordinates,
    scene: Phaser.Scene,
    cursor: Phaser.Types.Input.Keyboard.CursorKeys,
    controller?: Controller,
  ): void => {
    this.player = scene.physics.add
      .sprite(position.x, position.y, this.name)
      .setBounce(0)
    this.createFrameSets(scene)
    this.player.play(this.playerDirection)
    this.cursor = cursor
    this.controller = controller
  }

  update = (time: number): void => {
    // Hack to allow async `create` function to complete before updating
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!this.cursor) return
    let velocityX = 0
    let velocityY = 0
    this.updatePointerPosition()
    if (
      this.cursor.down.isDown ||
      this.cursor.up.isDown ||
      this.cursor.right.isDown ||
      this.cursor.left.isDown ||
      this.pointerDown ||
      this.pointerLeft ||
      this.pointerRight ||
      this.pointerUp
    ) {
      if (this.cursor.up.isDown || this.pointerUp) {
        velocityY = -this.PLAYER_VELOCITY_WALK
      } else if (this.cursor.down.isDown || this.pointerDown) {
        velocityY = this.PLAYER_VELOCITY_WALK
      }
      if (this.cursor.left.isDown || this.pointerLeft) {
        velocityX = -this.PLAYER_VELOCITY_WALK
      } else if (this.cursor.right.isDown || this.pointerRight) {
        velocityX = this.PLAYER_VELOCITY_WALK
      }
      if (velocityX != 0 && velocityY != 0) {
        velocityX = velocityX / Math.SQRT2
        velocityY = velocityY / Math.SQRT2
      }
    }
    this.changePlayerDirection(velocityX, velocityY, time)
  }

  public getSprite = () => this.player

  public getPlayerDirection = () => this.playerDirection

  private changePlayerDirection = (
    velocityX: number,
    velocityY: number,
    time: number,
  ) => {
    let move = 'walk'
    let isRunning = 1
    let direction = `idle`
    if (velocityX === 0) {
      if (velocityY > 0) {
        direction = `down`
      } else if (velocityY < 0) {
        direction = `up`
      }
    } else {
      if (velocityX > 0) {
        direction = `right`
      } else {
        direction = `left`
      }
    }

    const longWalk = time - this.walkTime > this.PLAYER_WALK_TO_RUN_TIME_IN_MS
    if (direction === 'idle' && !this.playerDirection.includes(direction)) {
      this.playerDirection = `${this.name}-idle`
      this.player.play(this.playerDirection)
    } else {
      const currentDirection = this.playerDirection
        .replace('walk', '')
        .replace('run', '')
        .replace(this.name, '')
        .replaceAll('-', '')
      if (
        currentDirection === direction &&
        this.playerDirection.includes('walk') &&
        longWalk
      ) {
        // Walking in the same direction for more than PLAYER_WALK_TO_RUN_TIME_IN_MS
        move = 'run'
        this.playerDirection = `${this.name}-${move}-${direction}`
        this.player.play(this.playerDirection)
      } else if (currentDirection !== direction) {
        this.walkTime = time
        this.playerDirection = `${this.name}-${move}-${direction}`
        this.player.play(this.playerDirection)
      }
    }
    if (longWalk && !direction.includes('idle')) {
      isRunning = SPRITE_VELOCITY_RUN_FACTOR
    }

    this.player.setVelocity(velocityX * isRunning, velocityY * isRunning)
  }

  private createFrameSets = (scene: Phaser.Scene) => {
    if (frameSetCreated) return
    const frameSets = createMovingFrameSets(this.name)
    for (let frameSet of frameSets) {
      scene.anims.create(frameSet)
    }
    scene.anims.create(createIdleFrameSet(this.name))
    frameSetCreated = true
  }

  private updatePointerPosition = (): void => {
    this.pointerRight = this.controller?.isMovingEast() ?? false
    this.pointerLeft = this.controller?.isMovingWest() ?? false
    this.pointerUp = this.controller?.isMovingNorth() ?? false
    this.pointerDown = this.controller?.isMovingSouth() ?? false
  }
}
