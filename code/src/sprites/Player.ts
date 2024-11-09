import Phaser from 'phaser'
import Controller from '../common/controller'
import { withLeadingZero } from '../common/formatter'
import getGeneralSettings, { GeneralSettings } from '../models/general'

export default class Player {
  private name = 'Mumu'
  private player!: Phaser.Physics.Arcade.Sprite
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
  private controller!: Controller
  private PLAYER_VELOCITY_WALK = 200
  private PLAYER_WALK_TO_RUN_TIME_IN_MS = 500
  private PLAYER_VELOCITY_RUN_FACTOR = 2
  private PLAYER_FRAMERATE = 6
  private playerDirection = 'idle'
  private pointerRight = false
  private pointerLeft = false
  private pointerUp = false
  private pointerDown = false
  private walkTime = 0
  private general: GeneralSettings = getGeneralSettings()

  preload = (scene: Phaser.Scene): void => {
    scene.load.atlas(
      this.name,
      `${this.general.baseUrls.images}/mumu.png`,
      `${this.general.baseUrls.json}/mumu.json`,
    )
  }

  create = (
    x: number,
    y: number,
    scene: Phaser.Scene,
    cursor: Phaser.Types.Input.Keyboard.CursorKeys,
    controller: Controller,
  ): void => {
    this.player = scene.physics.add.sprite(x, y, this.name).setBounce(0)
    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true, 0, 0, true)
    this.createFrameSets(scene)
    this.player.play(this.playerDirection)
    this.cursor = cursor
    this.controller = controller
  }

  update = (time: number): void => {
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

  stop = () => {
    this.changePlayerDirection(0, 0, 0)
  }

  public getPlayer = () => this.player

  private changePlayerDirection = (
    velocityX: number,
    velocityY: number,
    time: number,
  ) => {
    let move = 'walk'
    let isRunning = 1
    let direction = 'idle'
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

    if (direction === 'idle' && this.playerDirection !== direction) {
      this.playerDirection = direction
      this.player.play(this.playerDirection)
    } else {
      const currentDirection = this.playerDirection
        .replace('walk', '')
        .replace('run', '')
      if (
        currentDirection === direction &&
        this.playerDirection.includes('walk') &&
        longWalk
      ) {
        // Walking in the same direction for more than PLAYER_WALK_TO_RUN_TIME_IN_MS
        move = 'run'
        this.playerDirection = `${move}${direction}`
        this.player.play(this.playerDirection)
      } else if (currentDirection !== direction) {
        this.walkTime = time
        this.playerDirection = `${move}${direction}`
        this.player.play(this.playerDirection)
      }
    }
    if (longWalk && direction != 'idle') {
      isRunning = this.PLAYER_VELOCITY_RUN_FACTOR
    }

    this.player.setVelocity(velocityX * isRunning, velocityY * isRunning)
  }

  private createFrameSets = (scene: Phaser.Scene) => {
    scene.anims.create(
      this.createFrameSet('walk', 'right', this.PLAYER_FRAMERATE),
    )
    scene.anims.create(
      this.createFrameSet(
        'run',
        'right',
        this.PLAYER_FRAMERATE * this.PLAYER_VELOCITY_RUN_FACTOR,
      ),
    )
    scene.anims.create(
      this.createFrameSet('walk', 'left', this.PLAYER_FRAMERATE),
    )
    scene.anims.create(
      this.createFrameSet(
        'run',
        'left',
        this.PLAYER_FRAMERATE * this.PLAYER_VELOCITY_RUN_FACTOR,
      ),
    )
    scene.anims.create(
      this.createFrameSet('walk', 'down', this.PLAYER_FRAMERATE),
    )
    scene.anims.create(
      this.createFrameSet(
        'run',
        'down',
        this.PLAYER_FRAMERATE * this.PLAYER_VELOCITY_RUN_FACTOR,
      ),
    )
    scene.anims.create(this.createFrameSet('walk', 'up', this.PLAYER_FRAMERATE))
    scene.anims.create(
      this.createFrameSet(
        'run',
        'up',
        this.PLAYER_FRAMERATE * this.PLAYER_VELOCITY_RUN_FACTOR,
      ),
    )
    scene.anims.create(this.createFrameSet('', 'idle', 1, 1))
  }

  private updatePointerPosition = (): void => {
    this.pointerRight = this.controller.isMovingEast()
    this.pointerLeft = this.controller.isMovingWest()
    this.pointerUp = this.controller.isMovingNorth()
    this.pointerDown = this.controller.isMovingSouth()
  }

  private createFrameSet = (
    move: string,
    direction: string,
    frameRate: number,
    frameNumber = 3,
  ) => {
    const frames = []
    for (let i = 1; i <= frameNumber; i++) {
      const frameNumber = withLeadingZero(i)
      frames.push({
        key: this.name,
        frame: `${direction}-${frameNumber}`,
      })
    }
    return {
      key: `${move}${direction}`,
      frames,
      frameRate,
      repeat: -1,
    }
  }
}
