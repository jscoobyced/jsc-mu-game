import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick'
import { JoyStickKeys } from '../models/controller'

export default class Controller {
  private joystick!: VirtualJoystick
  private isUp = false
  private isDown = false
  private isLeft = false
  private isRight = false

  constructor(scene: Phaser.Scene) {
    const { height } = scene.game.canvas
    this.joystick = new VirtualJoystick(scene, {
      x: 110,
      y: height - 110,
      radius: 100,
      base: scene.add.circle(0, 0, 100, 0x888888),
      thumb: scene.add.circle(0, 0, 50, 0xcccccc),
    })
    this.joystick.on('update', this.updateController)
  }

  public isMovingNorth = () => this.isUp
  public isMovingSouth = () => this.isDown
  public isMovingEast = () => this.isRight
  public isMovingWest = () => this.isLeft

  private updateController = () => {
    const cursorKeys: JoyStickKeys = this.joystick.createCursorKeys()
    this.isDown = cursorKeys.down.isDown
    this.isUp = cursorKeys.up.isDown
    this.isLeft = cursorKeys.left.isDown
    this.isRight = cursorKeys.right.isDown
  }
}
