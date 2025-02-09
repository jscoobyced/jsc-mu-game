import Phaser from 'phaser'
import { isMobile } from '../common/deviceHelper'
import { Coordinates } from '../models/coordinates'
import getGeneralSettings, { GeneralSettings } from '../models/general'

export default class Banner {
  private general: GeneralSettings = getGeneralSettings()
  private TEXT_PAD_DEFAULT = 40
  private TEXT_PAD_MOBILE = 180
  private textPadX!: number
  private textPadY!: number
  private FONT_SIZE_DEFAULT = 56
  private FONT_SIZE_MOBILE = 40
  private fontSize!: number
  private image!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  private text!: Phaser.GameObjects.Text
  private bannerShiftX!: number
  private onPointerUp: () => void = () => {
    // to be defined
  }

  preload = (scene: Phaser.Scene): void => {
    scene.load.image('banner', `${this.general.baseUrls.images}/banner.png`)
  }

  create = (scene: Phaser.Scene): void => {
    this.image = scene.physics.add.image(0, 0, 'banner')
    this.image.setScale(
      isMobile(scene.game) ? 0.7 : 1,
      isMobile(scene.game) ? 0.9 : 1,
    )
    this.bannerShiftX = isMobile(scene.game) ? 140 : 0
    this.textPadX = isMobile(scene.game)
      ? this.TEXT_PAD_MOBILE
      : this.TEXT_PAD_DEFAULT
    this.textPadY = this.TEXT_PAD_DEFAULT
    this.fontSize = isMobile(scene.game)
      ? this.FONT_SIZE_MOBILE
      : this.FONT_SIZE_DEFAULT
    this.text = scene.add.text(
      this.image.x + this.textPadX,
      this.image.y + this.textPadY,
      '',
      {
        fontFamily: this.general.font,
        fontSize: `${this.fontSize.toString()}px`,
        color: 'brown',
      },
    )
    this.image.setVisible(false)
    this.text.setVisible(false)
    this.image.setInteractive()
    this.image.on('pointerup', () => {
      this.executeCallback()
    })
    if (scene.input.keyboard)
      scene.input.keyboard.on('keyup-SPACE', () => {
        this.executeCallback()
      })
  }

  show = (coordinates: Coordinates) => {
    this.image.setX(coordinates.x + this.bannerShiftX)
    this.image.setY(coordinates.y + 220)
    this.text.setX(
      coordinates.x - this.image.width / 2 + this.bannerShiftX + this.textPadX,
    )
    this.text.setY(coordinates.y + 50 + this.textPadY)
    this.image.setVisible(true)
    this.text.setVisible(true)
  }

  hide = () => {
    this.image.setVisible(false)
    this.text.setVisible(false)
  }

  showText = (text: string[], callback?: () => void) => {
    const content = text.map((current, index) => {
      if (index === 0 && text.length === 1) return '"' + current + '"'
      if (index === 0) return '"' + current
      if (index === text.length - 1) return current + '"'
      return current
    })
    this.text.setText(content)
    if (callback) {
      this.onPointerUp = callback
    }
  }

  private executeCallback = () => {
    this.onPointerUp()
  }
}
